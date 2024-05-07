let res = {
    "_embedded": [
      {
        "id": "OXF200060",
        "created": "2020-01-12T15:44:28Z",
        "modified": "2020-01-26T09:24:02Z",
        "marketingMode": "sales",
        "currency": "GBP",
        "active": true,
        "notes": "Looking to move his mother back into the area",
        "sellingStatus": null,
        "sellingPosition": null,
        "statusId": null,
        "lastCall": "2020-01-15",
        "nextCall": "2020-03-01",
        "departmentId": "G",
        "solicitorId": "OXF18000012",
        "potentialClient": false,
        "type": [
          "house",
          "maisonette",
          "cottage"
        ],
        "style": [
          "detached",
          "semiDetached"
        ],
        "situation": [
          "garden",
          "patio"
        ],
        "parking": [
          "garage"
        ],
        "age": [
          "period"
        ],
        "locality": [
          "rural"
        ],
        "specialFeatures": null,
        "unmappedRequirements": null,
        "bedroomsMin": 4,
        "bedroomsMax": 5,
        "receptionsMin": 1,
        "receptionsMax": 2,
        "bathroomsMin": 1,
        "bathroomsMax": 0,
        "parkingSpacesMin": 0,
        "parkingSpacesMax": 0,
        "locationType": "areas",
        "locationOptions": [
          "SOL",
          "BHM",
          "WLV"
        ],
        "archivedOn": null,
        "fromArchive": false,
        "buying": {
          "priceFrom": 250000,
          "priceTo": 275000,
          "decoration": null,
          "reasonId": null,
          "positionId": null,
          "tenure": [
            "freehold",
            "leasehold"
          ],
          "mortgageExpiry": null,
          "leaseRemaining": {
            "min": 15,
            "max": 25
          }
        },
        "renting": null,
        "externalArea": {
          "type": "acres",
          "amountFrom": 2,
          "amountTo": 3
        },
        "internalArea": {
          "type": "squareFeet",
          "amount": 1500
        },
        "source": {
          "id": "RMV",
          "type": "source"
        },
        "commercial": null,
        "regional": null,
        "officeIds": [
          "OXF",
          "SOL"
        ],
        "negotiatorIds": [
          "JAS"
        ],
        "related": [
          {
            "id": "OXF12300101",
            "name": "Mr John Smith",
            "title": "Mr",
            "forename": "John",
            "surname": "Smith",
            "dateOfBirth": "1992-08-12",
            "type": "contact",
            "homePhone": "01234 567890",
            "workPhone": null,
            "mobilePhone": "07890 123456",
            "email": "example@email.com",
            "fromArchive": false,
            "primaryAddress": {
              "buildingName": null,
              "buildingNumber": "1",
              "line1": "Test House",
              "line2": "Test Lane",
              "line3": "County of Test",
              "line4": "Test City",
              "postcode": "A11 2BB",
              "countryId": "GB"
            },
            "additionalContactDetails": null
          }
        ],
        "metadata": {
          "CustomField1": "CustomValue1",
          "CustomField2": true
        },
        "_eTag": null,
        "_links": {
          "self": {
            "href": "/applicants/OXF200060"
          },
          "documents": {
            "href": "/documents/?associatedType=applicant&associatedId=OXF200060"
          },
          "offers": {
            "href": "/offers/?applicantId=OXF200060"
          },
          "appointments": {
            "href": "/appointments/?attendeeType=applicant&attendeeId=OXF200060"
          },
          "department": {
            "href": "/departments/G"
          },
          "solicitor": {
            "href": "/companies/OXF18000012"
          },
          "offices": {
            "href": "/offices/?id=OXF&id=SOL"
          },
          "negotiators": {
            "href": "/negotiators/?id=JAS"
          },
          "relationships": {
            "href": "/applicants/OXF200060/relationships"
          },
          "areas": {
            "href": "/areas/?id=SOL&id=BHM&id=WLV"
          },
          "source": {
            "href": "/sources/RMV"
          }
        },
        "_embedded": null
      }
    ],
    "pageNumber": 1,
    "pageSize": 1,
    "pageCount": 1,
    "totalPageCount": 1,
    "totalCount": 25,
    "_links": {
      "self": {
        "href": "/applicants/?PageNumber=1&PageSize=1"
      },
      "first": {
        "href": "/applicants/?PageNumber=1&PageSize=1"
      },
      "next": {
        "href": "/applicants/?PageNumber=2&PageSize=1"
      },
      "last": {
        "href": "/applicants/?PageNumber=25&PageSize=1"
      }
    }
  }
  