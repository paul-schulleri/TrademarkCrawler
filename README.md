# TrademarkCrawler

## Usage

### Request
Url: localhost:3000

Body:
```json
{
	"query": "tm:apple~0.7 AND nc:9,28,41"
}
```

### Run command
Use docker-compose:
```bash
docker-compose up
```

Or run Dockerfile command:
```bash
docker run -p 3000:3000 <container>
```