FROM openjdk:11
ADD ./target/Gym-service-0.0.1-SNAPSHOT.jar /usr/src/Gym-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "Gym-service-0.0.1-SNAPSHOT.jar"]