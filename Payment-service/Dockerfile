FROM openjdk:11
ADD ./target/Payment-service-0.0.1-SNAPSHOT.jar /usr/src/Payment-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "Payment-service-0.0.1-SNAPSHOT.jar"]