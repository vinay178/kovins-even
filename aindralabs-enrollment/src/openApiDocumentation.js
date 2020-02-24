module.exports = {
  "openapi": "3.0.2",
  "info": {
    "version": "1.0",
    "title": "Enrollment and Verification ",
    "description": "Enrollment and Verification API"
  },
  "servers": [
    {
      "url": process.env.SVS_URL,
      "description": "svs server"
    },
    {
      "url": "http://localhost:3000/api/",
      "description": "Local server"
    }
  ],
  "security": [{
      "ApiKeyAuth": []
  }],
  "paths": {
    "/enrolluser": {
      "post": {
        "tags": [
          "File"
        ],
        "description": "enroll user",
        "operationId": "enrolluser",
        "parameters": [],
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "$ref": "#/components/schemas/enrollment"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "created",
            "content": {
              "application/json": {
                "example": {
                  "firebaseDeviceIdentifier": "",
                  "apiSuccessStatus": true,
                  "apiErrMessage": ""
                }
              }
            }
          },
          "400": {
            "description": "bad request",
            "content": {
              "application/json": {
                "example": {
                  "apiSuccessStatus": false,
                  "error": "enrolling user must upload atleast 5 files"
                }
              }
            }
          }
        }
      }
    },
    "/verifyuser": {
      "post": {
        "tags": ["verify user"],
        "description": "verify user",
        "operationId": "verifyuser",
        "parameters": [],
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "$ref": "#/components/schemas/verification"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "created",
            "content": {
              "application/json": {
                "example": {
                  "firebaseDeviceIdentifier": "",
                  "apiSuccessStatus": true,
                  "apiErrMessage": ""
                }
              }
            }
          },
          "400": {
            "description": "bad request",
            "content": {
              "application/json": {
                "example": {
                  "apiSuccessStatus": false,
                  "error": "verifying user must upload atleast 3 files"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "ApiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "authorization"
      }
    },
    "schemas": {
      "firebaseDeviceIdentifier": {
        "type": "string",
        "description": "Firebase device  identifier",
        "example": "cAaB1RppEpk:APAQ9Tvg00XIpl81X-6DIcllMut493xQOdSd2ZSQVwyj6vEC9-z1vSEuG8XGSR8kHjxEjx"
      },
      "jobType": {
        "type": "string",
        "description": "JobType identifier",
        "example": "ENROLL"
      },
      "jobId": {
        "type": "string",
        "description": "Job identifier",
        "example": "cAaB1Rp"
      },
      "userInfo_UID": {
        "type": "string",
        "description": "User identifier",
        "example": "cAaB1Rp"
      },
      "userInfo_OID": {
        "type": "string",
        "description": "Organization identifier",
        "example": "cAaB1Rp"
      },
      "retryCount": {
        "type": "integer",
        "description": "no.of retry attempt ",
        "example": 3
      },
      "date": {
        "type": "string",
        "description": "date in format yyyy-mm-dd",
        "example": "2019-10-19"
      },
      "sessionType": {
        "type": "integer",
        "description": "any number between 1 to n",
        "example": 3
      },
      "enrollImages": {
        "required":true,
        "description": "image file with name which has a  format of Epoch Timestamp, latitude, longitude, time zone",
        "type": "string",
        "format": "binary"
      },
      "filenames": {
        "type": "string",
        "description": "captured image names string which has a  format of Epoch Timestamp, latitude, longitude, time zone",
        "example": "1552184111_12.8974162_77.5831673_19800.jpg"
      },
      "enrollment":{
        "type": "object",
        "properties": {
          "firebaseDeviceIdentifier": {
            "$ref": "#/components/schemas/firebaseDeviceIdentifier"
          },
          "jobType": {
            "$ref": "#/components/schemas/jobType"
          },
          "jobId":{
            "$ref": "#/components/schemas/jobId"
          },
          "userInfo_OID": {
            "$ref": "#/components/schemas/userInfo_OID"
          },
          "userInfo_UID": {
            "$ref": "#/components/schemas/userInfo_UID"
          },
          "retryCount": {
            "$ref": "#/components/schemas/retryCount"
          },
          "enrollImages1": {
            "$ref": "#/components/schemas/enrollImages"
          },
          "enrollImages2": {
            "$ref": "#/components/schemas/enrollImages"
          },
          "enrollImages3": {
            "$ref": "#/components/schemas/enrollImages"
          },
          "enrollImages4": {
            "$ref": "#/components/schemas/enrollImages"
          },
          "enrollImages5": {
            "$ref": "#/components/schemas/enrollImages"
          },
          "filenames[0]": {
            "$ref": "#/components/schemas/filenames"
          },
          "filenames[1]": {
            "$ref": "#/components/schemas/filenames"
          },
          "filenames[2]": {
            "$ref": "#/components/schemas/filenames"
          },
          "filenames[3]": {
            "$ref": "#/components/schemas/filenames"
          },
          "filenames[4]": {
            "$ref": "#/components/schemas/filenames"
          }
        }
      },
      "verification":{
        "type": "object",
        "properties": {
          "firebaseDeviceIdentifier": {
            "$ref": "#/components/schemas/firebaseDeviceIdentifier"
          },
          "jobType": {
            "$ref": "#/components/schemas/jobType"
          },
          "jobId":{
            "$ref": "#/components/schemas/jobId"
          },
          "userInfo_OID": {
            "$ref": "#/components/schemas/userInfo_OID"
          },
          "userInfo_UID": {
            "$ref": "#/components/schemas/userInfo_UID"
          },
          "date": {
            "$ref": "#/components/schemas/date"
          },
          "sessionType": {
            "$ref": "#/components/schemas/sessionType"
          },
          "verifyImages1": {
            "$ref": "#/components/schemas/enrollImages"
          },
          "verifyImages2": {
            "$ref": "#/components/schemas/enrollImages"
          },
          "verifyImages3": {
            "$ref": "#/components/schemas/enrollImages"
          },
          "filenames[0]": {
            "$ref": "#/components/schemas/filenames"
          },
          "filenames[1]": {
            "$ref": "#/components/schemas/filenames"
          },
          "filenames[2]": {
            "$ref": "#/components/schemas/filenames"
          }
        }
      },
      "Error": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string"
          },
          "internal_code": {
            "type": "string"
          }
        }
      }
    }
  }

}
