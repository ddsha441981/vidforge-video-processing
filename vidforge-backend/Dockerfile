FROM openjdk:17-jdk-slim

LABEL org.opencontainers.image.authors="Deendayal Kumawat <codewithcup.developer@gmail.com>"
LABEL org.opencontainers.image.title="VidForge Video Processing"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.description="Spring Boot application for processing and managing video content using VidForge engine"
LABEL org.opencontainers.image.created="2025-04-13T12:00:00Z"
LABEL org.opencontainers.image.source="https://github.com/ddsha441981/vidforge-video-processing.git"
LABEL org.opencontainers.image.url="https://github.com/ddsha441981/vidforge-video-processing.git"
LABEL org.opencontainers.image.documentation="https://github.com/ddsha441981/vidforge-video-processing/blob/main/README.md"
LABEL org.opencontainers.image.license="MIT"
LABEL org.opencontainers.image.revision="6cb1f9645250e4d6ea931290f7285446eadbfd3c"
LABEL com.company.team="Media Processing Team"
LABEL com.company.contact="codewithcup.developer@gmail.com"

WORKDIR /app

COPY target/vidforge-app.jar vidforge-app.jar

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "vidforge-app.jar"]
