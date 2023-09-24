FROM openjdk:11
ADD ./target/Notification-service-0.0.1-SNAPSHOT.jar /usr/src/Notification-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "Notification-service-0.0.1-SNAPSHOT.jar"]