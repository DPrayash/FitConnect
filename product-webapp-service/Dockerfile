FROM openjdk:11
ADD ./target/product-webapp-service-0.0.1-SNAPSHOT.jar /usr/src/product-webapp-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "product-webapp-service-0.0.1-SNAPSHOT.jar"]