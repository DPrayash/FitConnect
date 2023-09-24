FROM openjdk:11
ADD ./target/User-service-0.0.1-SNAPSHOT.jar /usr/src/User-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "User-service-0.0.1-SNAPSHOT.jar"]