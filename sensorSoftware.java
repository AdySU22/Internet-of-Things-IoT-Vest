import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

public class sensorSoftware {

    // Temperature Sensor
    static class Temperature {
        double temperature;

        // Constructor for Temperature sensor
        public Temperature(double temperature) {
            this.temperature = temperature;
        }

        // Method to display current temperature and check for alert condition
        public void displayInfo() {
            System.out.println("Current Temperature: " + temperature + " C");
            checkTemperatureCondition();
        }

        // Method to update temperature with a random value
        public void updateTemperature() {
            temperature = generateRandomTemperature();
            displayInfo();
        }

        // Method to check if temperature is out of normal range and print alert
        private void checkTemperatureCondition() {
            if (temperature < 20 || temperature > 36) {
                System.out.println("Alert: Temperature out of normal range!");
            }
        }
    }

    // Blood Pressure Sensor
    static class BloodPressure {
        double bloodPressure;

        // Constructor for Blood Pressure sensor
        public BloodPressure(double bloodPressure) {
            this.bloodPressure = bloodPressure;
        }

        // Method to display current blood pressure and check for alert condition
        public void displayInfo() {
            System.out.println("Current Blood Pressure: " + bloodPressure + " mmHg");
            checkBloodPressureCondition();
        }

        // Method to update blood pressure with a random value
        public void updateBloodPressure() {
            bloodPressure = generateRandomBloodPressure();
            displayInfo();
        }

        // Method to check if blood pressure is out of normal range and print alert
        private void checkBloodPressureCondition() {
            if (bloodPressure < 60 || bloodPressure > 140) {
                System.out.println("Alert: Blood Pressure out of normal range!");
            }
        }
    }

    // Heart Rate Sensor
    static class HeartRate {
        double heartRate;

        // Constructor for Heart Rate sensor
        public HeartRate(double heartRate) {
            this.heartRate = heartRate;
        }

        // Method to display current heart rate and check for alert condition
        public void displayInfo() {
            System.out.println("Current Heart Rate: " + heartRate + " bpm");
            checkHeartRateCondition();
        }

        // Method to update heart rate with a random value
        public void updateHeartRate() {
            heartRate = generateRandomHeartRate();
            displayInfo();
        }

        // Method to check if heart rate is out of normal range and print alert
        private void checkHeartRateCondition() {
            if (heartRate < 50 || heartRate > 100) {
                System.out.println("Alert: Heart Rate out of normal range!");
            }
        }
    }

    // Main method to demonstrate the classes
    public static void main(String[] args) {
        // Create instances of sensors with initial random values
        Temperature temperatureSensor = new Temperature(generateRandomTemperature());
        BloodPressure bloodPressure = new BloodPressure(generateRandomBloodPressure());
        HeartRate heartRate = new HeartRate(generateRandomHeartRate());

        // Create a timer for periodic sensor updates
        Timer timer = new Timer(true);

        // TimerTask to update sensor values every 3 seconds
        TimerTask timerTask = new TimerTask() {
            @Override
            public void run() {
                temperatureSensor.updateTemperature();
                bloodPressure.updateBloodPressure();
                heartRate.updateHeartRate();
                System.out.println("\n-----------------------\n");
            }
        };

        // Schedule the timer task to run every 3000 milliseconds (3 seconds)
        timer.scheduleAtFixedRate(timerTask, 0, 3000);

        try {
            // Let the program run for 24 hours (86400000 milliseconds)
            Thread.sleep(24 * 60 * 60 * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Cancel the timer after the program finishes
        timer.cancel();
    }

    // Method to generate random numbers between 15 and 50 for temperature
    private static double generateRandomTemperature() {
        Random random = new Random();
        return 15 + random.nextFloat() * (50 - 15);
    }

    // Method to generate random numbers between 60 and 180 for blood pressure
    private static double generateRandomBloodPressure() {
        Random random = new Random();
        return 30 + random.nextFloat() * (190 - 30);
    }

    // Method to generate random numbers between 30 and 150 for heart rate
    private static double generateRandomHeartRate() {
        Random random = new Random();
        return 30 + random.nextFloat() * (150.0 - 30);
    }
}
