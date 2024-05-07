let res = {
    "_embedded": [
      {
        "id": "OXF18000001",
        "created": "2018-02-12T09:45:01Z",
        "modified": "2019-06-23T12:30:12Z",
        "title": "Mr",
        "forename": "John",
        "surname": "Smith",
        "dateOfBirth": "1992-08-12",
        "active": true,
        "marketingConsent": "grant",
        "identityCheck": null,
        "source": {
          "id": "SOL",
          "type": "office"
        },
        "homePhone": "01234 567890",
        "workPhone": null,
        "mobilePhone": "07890 123456",
        "email": "example@email.com",
        "archivedOn": null,
        "fromArchive": false,
        "primaryAddress": {
          "type": "primary",
          "buildingName": null,
          "buildingNumber": "15",
          "line1": "Example street",
          "line2": "Solihull",
          "line3": "West Midlands",
          "line4": null,
          "postcode": "B91 2XX",
          "countryId": "GB"
        },
        "secondaryAddress": null,
        "workAddress": {
          "type": "work",
          "buildingName": null,
          "buildingNumber": "44",
          "line1": "Test street",
          "line2": "Shirley",
          "line3": "West Midlands",
          "line4": null,
          "postcode": "B90 1ZZ",
          "countryId": "GB"
        },
        "officeIds": [
          "OXF"
        ],
        "negotiatorIds": [
          "JAS"
        ],
        "categoryIds": [],
        "communicationPreferenceLetter": false,
        "communicationPreferenceEmail": false,
        "communicationPreferencePhone": false,
        "communicationPreferenceSMS": false,
        "additionalContactDetails": null,
        "metadata": {
          "CustomField1": "CustomValue1",
          "CustomField2": "CustomValue2"
        },
        "_eTag": null,
        "extrasField": null,
        "_links": {
          "self": {
            "href": "/contacts/OXF18000001"
          },
          "documents": {
            "href": "/documents/?associatedType=contact&associatedId=OXF18000001"
          },
          "identityChecks": {
            "href": "/identityChecks/?contactId=OXF18000001"
          },
          "offices": {
            "href": "/offices/?id=OXF"
          },
          "negotiators": {
            "href": "/negotiators/?id=JAS"
          },
          "relationships": {
            "href": "/contacts/OXF18000001/relationships"
          },
          "subscriptions": {
            "href": "/contacts/OXF18000001/subscriptions"
          },
          "source": {
            "href": "/offices/SOL"
          }
        },
        "_embedded": null
      }
    ],
    "pageNumber": 1,
    "pageSize": 1,
    "pageCount": 1,
    "totalPageCount": 1,
    "totalCount": 50,
    "_links": {
      "self": {
        "href": "/contacts/?PageNumber=1&PageSize=1"
      },
      "first": {
        "href": "/contacts/?PageNumber=1&PageSize=1"
      },
      "next": {
        "href": "/contacts/?PageNumber=2&PageSize=1"
      },
      "last": {
        "href": "/contacts/?PageNumber=50&PageSize=1"
      }
    }
  }