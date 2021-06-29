<a name="top"></a>
# HealthApp API Spec v0.0.1

This is the documentation for the HealthApp API.

# Table of contents

- [/](#/)
  - [Get overview data for the last 7 days (for a dashboard)](#Get-overview-data-for-the-last-7-days-(for-a-dashboard))
- [/bp](#/bp)
  - [Create New Blood Pressure Entry](#Create-New-Blood-Pressure-Entry)
  - [Get Blood Pressure Entries](#Get-Blood-Pressure-Entries)
- [/water](#/water)
  - [Create New Water Intake Entry](#Create-New-Water-Intake-Entry)
  - [Get Water Intake Entries](#Get-Water-Intake-Entries)

___


# <a name='/'></a> /

## <a name='Get-overview-data-for-the-last-7-days-(for-a-dashboard)'></a> Get overview data for the last 7 days (for a dashboard)
[Back to top](#top)

<p>Returns the last 7 days of data for both blood pressure entries as well as water intake entries. No pagination. No params.</p>

```
GET /
```

### Examples
Example

```curl
curl http://localhost:3000/
{
  "bp": [
    {
      "id": "ec51e7a0-b87a-4b2d-9035-85565c8770d6",
      "createdAt": "2021-06-29T10:50:46.064Z",
      "updatedAt": "2021-06-29T10:50:46.064Z",
      "diastolic": 17,
      "systolic": 80,
      "heartrate": 75
    },
    {
      "id": "d59bf1d0-2888-493d-b37b-d2fcc1609989",
      "createdAt": "2021-06-29T08:19:47.248Z",
      "updatedAt": "2021-06-29T08:19:47.248Z",
      "diastolic": 62,
      "systolic": 20,
      "heartrate": 54
    }
  ]
  "water": [
    {
      "id": "6a3f8dac-a373-41c4-81a9-2a06034aa674",
      "createdAt": "2021-06-29T08:19:35.370Z",
      "updatedAt": "2021-06-29T08:19:35.370Z",
      "ml": 253
    },
    {
      "id": "a5591500-04cf-4db2-9cbf-3569fabc78b8",
      "createdAt": "2021-06-29T08:19:33.552Z",
      "updatedAt": "2021-06-29T08:19:33.552Z",
      "ml": 638
    }
  ]
}
```

# <a name='/bp'></a> /bp

## <a name='Create-New-Blood-Pressure-Entry'></a> Create New Blood Pressure Entry
[Back to top](#top)

<p>To create a new Blood Pressure object, send a POST request of Content-Type &quot;application/json&quot; to the endpoint &quot;/bp&quot; with a plain-text body that is, itself, a JSON object describing the entry you're about to create. <strong>The document</strong> you post <strong>MUST BE VALID JSON</strong>. For example, it <strong>CANNOT CONTAIN LEADING ZEROS</strong> for the values because those are invalid according to the JSON spec itself. Also, don't make them strings either.</p>

```
POST /bp
```

### Examples
Raw HTTP POST body

```json
{
  "diastolic": 93,
  "systolic": 80,
  "heartrate": 73
}
```

### Success response example

#### Success response example - `Success-Response:`

```json
{
  "bp": {
    "id": "ec51e7a0-b87a-4b2d-9035-85565c8770d6",
    "createdAt": "2021-06-29T10:50:46.064Z",
    "updatedAt": "2021-06-29T10:50:46.064Z",
    "diastolic": 17,
    "systolic": 80,
    "heartrate": 75
  }
}
```

## <a name='Get-Blood-Pressure-Entries'></a> Get Blood Pressure Entries
[Back to top](#top)

<p>To get any number of blood pressure entires, run an HTTP GET request against the URL as defined above (example below). The <code>:oldest</code> and <code>:newest</code> params need to be <strong>MILLI</strong>SECONDS since the Unix epoch (which is, by definition, already in UTC). The API will respond back with an array of every Blood Pressure object between those dates (<em>inclusive</em>).</p>

```
GET /bp/from/:oldest/to/:newest
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| oldest | `Number` | <p>Start time (Unix epoch, milliseconds)</p> |
| newest | `Number` | <p>End time (Unix epoch, milliseconds)</p> |

### Examples
Example

```curl
curl http://localhost:3000/bp/from/1624384948000/to/1624989748000

{
  "bp_entries": [
    {
      "id": "ec51e7a0-b87a-4b2d-9035-85565c8770d6",
      "createdAt": "2021-06-29T10:50:46.064Z",
      "updatedAt": "2021-06-29T10:50:46.064Z",
      "diastolic": 17,
      "systolic": 80,
      "heartrate": 75
    },
    {
      "id": "d59bf1d0-2888-493d-b37b-d2fcc1609989",
      "createdAt": "2021-06-29T08:19:47.248Z",
      "updatedAt": "2021-06-29T08:19:47.248Z",
      "diastolic": 62,
      "systolic": 20,
      "heartrate": 54
    }
  ]
}
```

# <a name='/water'></a> /water

## <a name='Create-New-Water-Intake-Entry'></a> Create New Water Intake Entry
[Back to top](#top)

<p>To create a new water intake entry, send a POST request of Content-Type &quot;application/json&quot; to the endpoint &quot;/water&quot; with a plain-text body that is, itself, a JSON object describing the entry you're about to create. <strong>The document</strong> you post <strong>MUST BE VALID JSON</strong>. For example, it <strong>CANNOT CONTAIN LEADING ZEROS</strong> for the values because those are invalid according to the JSON spec itself. Also, don't make them strings either.</p>

```
POST /water
```

### Examples
Raw HTTP POST body

```json
{
  "ml": 320
}
```

### Success response example

#### Success response example - `Success-Response:`

```json
{
  "water": {
    "id": "661bf744-c8d9-4ccd-a646-3723f0df5515",
    "createdAt": "2021-06-29T11:17:51.809Z",
    "updatedAt": "2021-06-29T11:17:51.809Z",
    "ml": 320
  }
}
```

## <a name='Get-Water-Intake-Entries'></a> Get Water Intake Entries
[Back to top](#top)

<p>Retrieve all water intake entries between the times represented by <code>:oldest</code> and <code>:newest</code>, both as <strong>milliseconds since the UNIX epoch</strong>, <em>inclusive</em>. No pagination.</p>

```
GET /water/from/:oldest/to/:newest
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| oldest | `Number` | <p>Start time (Unix epoch, milliseconds)</p> |
| newest | `Number` | <p>End time (Unix epoch, milliseconds)</p> |

### Examples
Example

```curl
curl http://localhost:3000/water/from/1624384948000/to/1624989748000

{
  "water": [
    {
      "id": "661bf744-c8d9-4ccd-a646-3723f0df5515",
      "createdAt": "2021-06-29T11:17:51.809Z",
      "updatedAt": "2021-06-29T11:17:51.809Z",
      "ml": 320
    },
    {
      "id": "6a3f8dac-a373-41c4-81a9-2a06034aa674",
      "createdAt": "2021-06-29T08:19:35.370Z",
      "updatedAt": "2021-06-29T08:19:35.370Z",
      "ml": 253
    }
  ]
}
```

