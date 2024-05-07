let res = {
    "_embedded": [
      {
        "id": "JAS",
        "created": "2018-12-12T12:30:23.0000000Z",
        "modified": "2019-01-08T12:30:34.0000000Z",
        "name": "Mr John Smith",
        "jobTitle": "Senior Sales Negotiator",
        "officeId": "OXF",
        "workPhone": "01234 567890",
        "mobilePhone": "07890 123456",
        "email": "example@email.com",
        "profileImageUrl": null,
        "active": true,
        "metadata": {
          "CustomField1": "CustomValue1",
          "CustomField2": true
        },
        "_eTag": null,
        "_links": {
          "self": {
            "href": "/negotiators/JAS"
          },
          "office": {
            "href": "/offices/OXF"
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
        "href": "/negotiators/?PageNumber=1&PageSize=1"
      },
      "first": {
        "href": "/negotiators/?PageNumber=1&PageSize=1"
      },
      "next": {
        "href": "/negotiators/?PageNumber=2&PageSize=1"
      },
      "last": {
        "href": "/negotiators/?PageNumber=25&PageSize=1"
      }
    }
  }