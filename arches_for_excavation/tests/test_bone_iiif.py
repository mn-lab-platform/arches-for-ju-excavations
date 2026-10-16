from io import BytesIO

from django.test import SimpleTestCase
from django.urls import reverse
from PIL import Image


class BoneIiifServiceTests(SimpleTestCase):
    def test_info_json_describes_source_and_tiles(self):
        response = self.client.get(
            reverse("bone-iiif-image-info", kwargs={"image_id": "multimedia"})
        )

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["width"], 771)
        self.assertEqual(data["height"], 1374)
        self.assertEqual(data["tiles"][0]["width"], 256)
        self.assertEqual(data["@id"], "https://testserver/iiif/bone-inventory/multimedia")

    def test_info_json_uses_https_for_a_public_host(self):
        response = self.client.get(
            reverse("bone-iiif-image-info", kwargs={"image_id": "multimedia"}),
            HTTP_HOST="dev.mn.cenagis.edu.pl",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json()["@id"],
            "https://dev.mn.cenagis.edu.pl/iiif/bone-inventory/multimedia",
        )

    def test_full_image_request(self):
        response = self.client.get(
            reverse(
                "bone-iiif-image-request",
                kwargs={
                    "image_id": "multimedia",
                    "region": "full",
                    "size": "max",
                    "rotation": "0",
                    "quality": "default",
                    "image_format": "jpg",
                },
            )
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Content-Type"], "image/jpeg")
        with Image.open(BytesIO(response.content)) as image:
            self.assertEqual(image.size, (771, 1374))

    def test_crop_and_width_resize(self):
        response = self.client.get(
            reverse(
                "bone-iiif-image-request",
                kwargs={
                    "image_id": "multimedia",
                    "region": "100,200,300,400",
                    "size": "150,",
                    "rotation": "0",
                    "quality": "default",
                    "image_format": "png",
                },
            )
        )

        self.assertEqual(response.status_code, 200)
        with Image.open(BytesIO(response.content)) as image:
            self.assertEqual(image.size, (150, 200))

    def test_rejects_region_outside_source(self):
        response = self.client.get(
            reverse(
                "bone-iiif-image-request",
                kwargs={
                    "image_id": "multimedia",
                    "region": "700,1300,100,100",
                    "size": "100,",
                    "rotation": "0",
                    "quality": "default",
                    "image_format": "jpg",
                },
            )
        )

        self.assertEqual(response.status_code, 400)

    def test_example_csv_is_a_download(self):
        response = self.client.get(reverse("bone-inventory-example-csv"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Content-Type"], "text/csv; charset=utf-8")
        self.assertEqual(
            response["Content-Disposition"],
            'attachment; filename="bone-inventory-example.csv"',
        )
        self.assertIn(b"id,bone_id,description", response.content)
