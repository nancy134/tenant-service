# Configuration
.env
```
DATABASE_URL=
```
# API
```
/tenants
```
Response
```
```
[
  {
    "id":1,
    "name":"tenant1",
    "cognito_pool_id":"useast-1_…”,
    "cognito_client_id”:”…”,
    "createdAt":"2019-12-27T20:47:11.433Z",
    "updatedAt":"2019-12-27T20:47:11.433Z"
  }
]

```
/tenant?name={tenantName}
```
Reponse
```
  {
    "id":1,
    "name":"tenant1",
    "cognito_pool_id":"useast-1_…”,
    "cognito_client_id”:”…”,
    "createdAt":"2019-12-27T20:47:11.433Z",
    "updatedAt":"2019-12-27T20:47:11.433Z"
  }
```
