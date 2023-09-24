FROM openjdk:11
ADD ./target/Chat-service-0.0.1-SNAPSHOT.jar /usr/src/Chat-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "Chat-service-0.0.1-SNAPSHOT.jar"]