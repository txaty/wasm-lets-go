package main

import (
	"flag"
	"log"
	"net/http"
	"strings"
)

func main() {
	dir := flag.String("d", ".", "the directory of static files to host")
	flag.Parse()

	fs := http.FileServer(http.Dir(*dir))
	log.Print("Serving " + (*dir) + " on http://localhost:8080")
	if err := http.ListenAndServe(":8080",
		http.HandlerFunc(
			func(resp http.ResponseWriter, req *http.Request) {
				// Set the Cache-Control header so the browser doesn't cache the files. For development only.
				resp.Header().Add("Cache-Control", "no-cache")
				// Make sure wasm files are serverd with the Content-Type header set to application/wasm.
				// Otherwise, most browsers won't run them.
				if strings.HasSuffix(req.URL.Path, ".wasm") {
					resp.Header().Set("content-type", "application/wasm")
				}
				fs.ServeHTTP(resp, req)
			},
		),
	); err != nil {
		log.Fatal(err)
	}
}
