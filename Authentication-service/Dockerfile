FROM openjdk:11
ADD ./target/Authentication-service-0.0.1-SNAPSHOT.jar /usr/src/Authentication-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "Authentication-service-0.0.1-SNAPSHOT.jar"]