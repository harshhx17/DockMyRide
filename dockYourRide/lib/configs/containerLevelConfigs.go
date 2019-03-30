package configs

import (
	"fmt"
)

func CreateNodeContainerConfig(name string, appContext map[string]interface{}) string {
	return fmt.Sprintf(`
server {
    listen 80;
    server_name %s.%s;

    location / {
    	proxy_set_header   X-Forwarded-For $remote_addr;
    	proxy_set_header   Host $http_host;
    	proxy_pass         http://127.0.0.1:%s;
	}
}
`, name, "game", appContext["port"].(string))
}
