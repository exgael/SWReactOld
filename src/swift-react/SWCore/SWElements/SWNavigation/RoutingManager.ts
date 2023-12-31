class RoutingManager {
    // Holds the current route
    currentRoute = '/';

    // Method to navigate to a new route
    navigateTo(route: string) {
        this.currentRoute = route;
        this.onRouteChange(this.currentRoute);
    }

    // Callback when route changes
    onRouteChange = (route: string) => {
        // To be implemented in the React component
    };
}

const routingManager: RoutingManager = new RoutingManager();

export default routingManager;