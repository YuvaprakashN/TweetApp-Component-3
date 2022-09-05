FROM openjdk:11
EXPOSE 9090
ADD "target/TweetApp.jar" "app.jar"
ENTRYPOINT [ "java", "-jar", "/app.jar" ]