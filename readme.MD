

#  postgress
services:

  backend:
    build:
      context: .
      dockerfile: Dockerfile
      args:
       - DATABASE_URL=postgresql://postgres:postgres@db:5432/test-db?schema=public
    container_name: node-backend
    restart: always
    ports:
      - "3000:3000"
      - '5555:5555'
    environment:    
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/test-db?schema=public
      # - NEXT_WEBPACK_USEPOLLING=1
    
    depends_on:
     db:
        condition: service_healthy  
    networks:
      - app-network    
  db:
    image: postgres:alpine
    container_name: db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: test-db
      POSTGRES_MAX_CONNECTIONS: 200
    ports:
      - 5732:5432
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: [ 'CMD-SHELL', 'pg_isready -d $${POSTGRES_DB} -U $${POSTGRES_USER}' ]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network      

volumes:
  postgres-data:
networks:
  app-network:
    driver: bridge  

# mysql

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - DATABASE_URL=mysql://root:password@db:3306/test-db
    container_name: node-backend
    restart: always
    ports:
      - "3000:3000"
      - "5555:5555"
    environment:    
      - DATABASE_URL=mysql://root:password@db:3306/test-db
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network

  db:
    image: mysql:8.0
    container_name: db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: test-db
      MYSQL_USER: user
      MYSQL_PASSWORD: userpassword
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    healthcheck:
      test: ["CMD-SHELL", "mysqladmin ping -h localhost -u root -p$${MYSQL_ROOT_PASSWORD} || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

volumes:
  mysql-data:

networks:
  app-network:
    driver: bridge


