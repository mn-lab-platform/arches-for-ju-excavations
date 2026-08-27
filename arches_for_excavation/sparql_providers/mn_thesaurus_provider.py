import urllib.request, urllib.error, urllib.parse
from django.utils.translation import gettext as _
from arches.app.models.models import DValueType
from arches.app.models.concept import Concept
from arches.app.models.system_settings import settings
from arches.app.utils.betterJSONSerializer import JSONDeserializer
from SPARQLWrapper import JSON
from arches.app.utils.data_management.sparql_providers.abstract_provider import Abstract_Provider
from rdflib.namespace import DCTERMS

class MNThesaurusProvider(Abstract_Provider):
    def __init__(self, **kwargs):
        super(MNThesaurusProvider, self).__init__(
            "https://thesaurus.mn.cenagis.edu.pl/sparql", **kwargs
        )

        self.name = _("MN Lab Platform Thesaurus")
        self.setReturnFormat(JSON)

    def get_concepts(self, uris):
        """
        Get a list of concepts given a list of URIs.
        """
        dcterms_identifier_type = DValueType.objects.get(
            valuetype=str(DCTERMS.identifier).replace(str(DCTERMS), ""),
            namespace="dcterms",
        )

        concepts = []
        langs = []
        for lang in self.allowed_languages:
            langs.append('"%s"' % (lang.lower()))

        for uri in uris.split(","):
            uri = uri.strip()

            query = """
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                PREFIX schema: <http://schema.org/>
                PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

                SELECT ?value ?type WHERE {
                  {
                    <%s> rdfs:label ?value .
                    BIND('prefLabel' AS ?type)
                  }
                  UNION
                  {
                    <%s> skos:altLabel ?value .
                    BIND('altLabel' AS ?type)
                  }
                  UNION
                  {
                    <%s> schema:description ?value .
                    BIND('scopeNote' AS ?type)
                  }
                  FILTER (lang(?value) in (%s))
                }""" % (
                uri,
                uri,
                uri,
                ",".join(langs),
            )

            results = self.perform_sparql_query(query)

            if len(results["results"]["bindings"]) > 0:
                concept = Concept()
                concept.nodetype = "Concept"
                for result in results["results"]["bindings"]:
                    concept.addvalue(
                        {
                            "type": result["type"]["value"],
                            "value": result["value"]["value"],
                            "language": result["value"]["xml:lang"],
                        }
                    )
                concept.addvalue(
                    {
                        "value": uri,
                        "language": settings.LANGUAGE_CODE,
                        "type": dcterms_identifier_type.valuetype,
                        "category": dcterms_identifier_type.category,
                    }
                )
                concepts.append(concept)
            else:
                raise Exception(
                    _(
                        "<strong>Error in SPARQL query:</strong><br>Query returned 0 results."
                    )
                )

        return concepts

    def search_for_concepts(self, terms):
        """
        Search custom endpoint using standard SPARQL 1.1 filtering.
        """
        safe_terms = (terms or "").replace("\\", "\\\\").replace('"', '\\"')

        query = """
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX schema: <http://schema.org/>
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

            SELECT ?Subject ?Term ?ScopeNote WHERE {
                {
                    ?Subject rdfs:label ?Term .
                } UNION {
                    ?Subject skos:altLabel ?Term .
                }
                OPTIONAL { ?Subject schema:description ?ScopeNote . }
                
                FILTER(CONTAINS(LCASE(?Term), LCASE("%s")))
                FILTER(LANG(?Term) = "en" || LANG(?Term) = "")
            } LIMIT 100""" % (
            safe_terms
        )

        return self.perform_sparql_query(query)

    def perform_sparql_query(self, query):
        self.setQuery(query)

        req = urllib.request.Request(
            self.endpoint
            + "?"
            + self._getRequestEncodedParameters(("query", self.queryString))
        )
        
        req.add_header("Accept", "application/sparql-results+json")
        
        f = urllib.request.urlopen(req)
        return JSONDeserializer().deserialize(f.read())