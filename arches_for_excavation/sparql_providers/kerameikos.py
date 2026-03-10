"""
ARCHES - a program developed to inventory and manage immovable cultural heritage.
Copyright (C) 2013 J. Paul Getty Trust and World Monuments Fund
"""

import urllib.request, urllib.error, urllib.parse
from django.utils.translation import gettext as _
from arches.app.models.models import DValueType
from arches.app.models.concept import Concept
from arches.app.models.system_settings import settings
from arches.app.utils.betterJSONSerializer import JSONDeserializer
from SPARQLWrapper import JSON
from arches.app.utils.data_management.sparql_providers.abstract_provider import Abstract_Provider
from rdflib.namespace import SKOS, DCTERMS


class Kerameikos_Provider(Abstract_Provider):
    def __init__(self, **kwargs):
        super(Kerameikos_Provider, self).__init__(
            "https://kerameikos.org/query", **kwargs
        )

        self.name = _("Kerameikos (Greek Ceramics)")
        self.setReturnFormat(JSON)

    def get_concepts(self, uris):
        """
        Get a list of concepts given a list of Kerameikos URIs
        """
        default_lang = settings.LANGUAGE_CODE
        dcterms_identifier_type = DValueType.objects.get(
            valuetype=str(DCTERMS.identifier).replace(str(DCTERMS), ""),
            namespace="dcterms",
        )

        concepts = []
        langs = []
        for lang in self.allowed_languages:
            langs.append('"%s"' % (lang.lower()))
            
        for uri in uris.split(","):
            query = """
                PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
                SELECT ?value ?type WHERE {
                  {
                    <%s> skos:prefLabel ?value .
                    BIND('prefLabel' AS ?type)
                  }
                  UNION
                  {
                    <%s> skos:definition ?value .
                    BIND('scopeNote' AS ?type)
                  }
                  UNION
                  {
                    <%s> skos:scopeNote ?value .
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
        Search Kerameikos using standard SPARQL regex matching, pulling descriptions.
        """
        query = """
            PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
            PREFIX crmgeo: <http://www.ics.forth.gr/isl/CRMgeo/>
            PREFIX crmsci: <http://www.ics.forth.gr/isl/CRMsci/>
            PREFIX dcterms: <http://purl.org/dc/terms/>
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
            PREFIX kid: <https://kerameikos.org/id/>
            PREFIX kon: <https://kerameikos.org/ontology#>
            PREFIX org: <http://www.w3.org/ns/org#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            
            SELECT ?Subject ?Term ?ScopeNote WHERE {
                ?Subject a skos:Concept .
                ?Subject skos:prefLabel ?Term .
                
                FILTER(regex(str(?Term), "^%s", "i"))
                
                OPTIONAL {
                    { ?Subject skos:definition ?ScopeNote }
                    UNION
                    { ?Subject skos:scopeNote ?ScopeNote }
                }
                
                FILTER(langMatches(lang(?Term), "en") || lang(?Term) = "")
            } LIMIT 100""" % (terms)

        results = self.perform_sparql_query(query)
        return results

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