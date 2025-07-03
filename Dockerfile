FROM cubejs/cube:v0.31.57

ENV CUBEJS_DEV_MODE=true

WORKDIR /cube/conf

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]

