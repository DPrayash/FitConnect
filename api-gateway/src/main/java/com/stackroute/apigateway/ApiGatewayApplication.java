package com.stackroute.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableEurekaClient
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}
	@Bean 
	public RouteLocator   gatewayRouteLocater(RouteLocatorBuilder builder) {
	return builder.routes()
		.route(r->r.path("/auth/**")
				.uri("lb://AUTHENTICATION-SERVICE"))
		.route(r->r.path("/Chat/**")
				.uri("lb://CHAT-SERVICE"))
		.route(r->r.path("/api/v1/gym-service/**")
				.uri("lb://GYM-SERVICE"))
		.route(r->r.path("/feedback/**")
				.uri("lb://FEEDBACK-SERVICE"))
		.route(r->r.path("/mail/**")
				.uri("lb://NOTIFICATION-SERVICE"))
		.route(r->r.path("/payment/**")
				.uri("lb://PAYMENT-SERVICE"))
		.route(r->r.path("/api/v1/user-service/users/**")
				.uri("lb://USER-SERVICE"))
		.route(r->r.path("/api/v1/user-service/slots/**")
				.uri("lb://USER-SERVICE"))
			.route(r->r.path("/api/v1/user-service/admin/**")
					.uri("lb://USER-SERVICE"))
		.route(r->r.path("/**")
				.uri("lb://PRODUCT-WEBAPP-SERVICE"))
		
		
		
		.build();
	}


}
