import time
import random
import json

class NodeMonitor:
    """
    Simulates a gRPC Heartbeat service that monitors the health of 5 DataNodes.
    """
    def __init__(self, node_count=5):
        self.nodes = {f"Node-{i+1}": {"status": "online", "latency": "2ms"} for i in range(node_count)}
        
    def check_health(self):
        """
        Randomly fluctuates health to simulate real-world cluster behavior.
        """
        for name, data in self.nodes.items():
            # 5% chance of node failure in simulation
            if random.random() < 0.05:
                data["status"] = "failed"
                data["latency"] = "inf"
                print(f"[ChaosMonitor] ALERT: {name} has disconnected.")
            else:
                data["status"] = "online"
                data["latency"] = f"{random.randint(1, 15)}ms"
        
        return self.nodes

    def run_heartbeat_stream(self, duration_seconds=30):
        """
        Streams health updates (Simulating a gRPC stream).
        """
        print(f"[gRPC] Starting Heartbeat Stream (PID: {os.getpid()})...")
        start_time = time.time()
        while time.time() - start_time < duration_seconds:
            health_state = self.check_health()
            # In a real setup, this would be pushed via a socket or gRPC stream
            # print(f"Heartbeat: {json.dumps(health_state)}")
            time.sleep(2)
        print("[gRPC] Stream closed.")

if __name__ == "__main__":
    import os
    monitor = NodeMonitor()
    monitor.run_heartbeat_stream(10)
