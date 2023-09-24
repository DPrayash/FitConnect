FROM openjdk:11
ADD ./target/Feedback-service-0.0.1-SNAPSHOT.jar /usr/src/Feedback-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "Feedback-service-0.0.1-SNAPSHOT.jar"]