#!/bin/bash
pm2 stop server.js
npm install
ng build
pm2 start server.js