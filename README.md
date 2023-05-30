# Airtag Locator

Airtag Locator lets you parse, store and visualize cache data from Apple's "Find
My" App. It provides a web interface to access the current location of all
devices.

## Features

- Retrieve cache data from Apple's "Find My" application
- Parse and store data into a SQLite database
- Web interface to access the current location of all devices
- Docker Compose support for easy deployment

## Why?

Sharing AirTags with friends and family isn't supported by Apple. Exactly this
is what I wanted to do, so I decided to build a small application for it.

## What isn't supported

- Authentication: Airtag Locator does not support authentication. It is
  recommended to run it in a private network.

## Getting Started

To get started with Airtag Locator, follow these steps:

1. Clone the
   repository: `git clone https://github.com/ahoendgen/airtag-locator.git`
2. Navigate to the project directory: `cd airtag-locator`
3. (optional) Adjust the `docker-commpose.override.yml` file to your needs
4. Start the Docker containers: `docker-compose up -d` (
   include `docker-compose.override.yml` if you used it in step 3)
5. Keep the "Find My" application open on your Mac to refresh the cache data

Once the containers are up and running, you can access the web interface by
visiting `http://localhost:80` in your browser.

## Configuration

See `.env.dist` for a list of environment variables that can be configured.

## License

Airtag Locator is released under the [MIT License](LICENSE).
