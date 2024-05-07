let res = {
    "_embedded": [
      {
        "id": "BRM",
        "created": "2019-01-25T15:44:28Z",
        "modified": "2020-01-26T09:24:02Z",
        "name": "Birmingham",
        "active": true,
        "type": "polygon",
        "area": [
          "51.60009,-0.21789",
          "51.47025,-0.27282",
          "51.50445,0.00184"
        ],
        "departmentIds": [
          "G"
        ],
        "officeIds": [
          "OXF",
          "SOL"
        ],
        "parentIds": null,
        "_eTag": null,
        "_links": {
          "self": {
            "href": "/areas/BRM"
          },
          "offices": {
            "href": "/offices/?id=OXF&id=SOL"
          },
          "departments": {
            "href": "/departments/?id=G"
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
        "href": "/areas/?PageNumber=1&PageSize=1"
      },
      "first": {
        "href": "/areas/?PageNumber=1&PageSize=1"
      },
      "next": {
        "href": "/areas/?PageNumber=2&PageSize=1"
      },
      "last": {
        "href": "/areas/?PageNumber=25&PageSize=1"
      }
    }
  }