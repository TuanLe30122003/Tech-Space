// Schema định nghĩa các thông số chi tiết cho từng loại sản phẩm
// Mỗi field có: key, label, type, và các options tùy theo type

export const specificationSchema = {
    Earphone: [
        {
            key: "driverSize",
            label: "Driver Size",
            type: "text",
            placeholder: "e.g., 10mm, 12mm",
            unit: "mm",
        },
        {
            key: "connectivity",
            label: "Connectivity",
            type: "select",
            options: ["Wired", "Wireless", "Bluetooth 5.0", "Bluetooth 5.1", "Bluetooth 5.2", "USB-C"],
        },
        {
            key: "batteryLife",
            label: "Battery Life",
            type: "number",
            placeholder: "e.g., 8",
            unit: "hours",
            min: 0,
            max: 100,
        },
        {
            key: "weight",
            label: "Weight",
            type: "number",
            placeholder: "e.g., 5",
            unit: "g",
            min: 0,
            step: 0.1,
        },
        {
            key: "noiseCancellation",
            label: "Noise Cancellation",
            type: "boolean",
        },
        {
            key: "waterResistance",
            label: "Water Resistance",
            type: "select",
            options: ["None", "IPX4", "IPX5", "IPX7", "IPX8"],
        },
    ],
    Headphone: [
        {
            key: "driverSize",
            label: "Driver Size",
            type: "text",
            placeholder: "e.g., 40mm, 50mm",
            unit: "mm",
        },
        {
            key: "connectivity",
            label: "Connectivity",
            type: "select",
            options: ["Wired", "Wireless", "Bluetooth 5.0", "Bluetooth 5.1", "Bluetooth 5.2", "USB-C"],
        },
        {
            key: "batteryLife",
            label: "Battery Life",
            type: "number",
            placeholder: "e.g., 30",
            unit: "hours",
            min: 0,
            max: 100,
        },
        {
            key: "noiseCancellation",
            label: "Noise Cancellation",
            type: "boolean",
        },
        {
            key: "weight",
            label: "Weight",
            type: "number",
            placeholder: "e.g., 250",
            unit: "g",
            min: 0,
            step: 1,
        },
        {
            key: "impedance",
            label: "Impedance",
            type: "number",
            placeholder: "e.g., 32",
            unit: "Ω",
            min: 0,
        },
    ],
    Watch: [
        {
            key: "display",
            label: "Display",
            type: "text",
            placeholder: "e.g., 1.4 inch AMOLED",
        },
        {
            key: "batteryLife",
            label: "Battery Life",
            type: "number",
            placeholder: "e.g., 7",
            unit: "days",
            min: 0,
            max: 30,
        },
        {
            key: "waterResistance",
            label: "Water Resistance",
            type: "select",
            options: ["None", "3 ATM", "5 ATM", "10 ATM", "20 ATM", "50 ATM"],
        },
        {
            key: "strapMaterial",
            label: "Strap Material",
            type: "select",
            options: ["Silicone", "Leather", "Metal", "Fabric", "Nylon"],
        },
        {
            key: "screenSize",
            label: "Screen Size",
            type: "number",
            placeholder: "e.g., 1.4",
            unit: "inches",
            min: 0,
            max: 5,
            step: 0.1,
        },
        {
            key: "sensors",
            label: "Sensors",
            type: "text",
            placeholder: "e.g., Heart rate, GPS, Accelerometer",
        },
    ],
    Smartphone: [
        {
            key: "display",
            label: "Display",
            type: "text",
            placeholder: "e.g., 6.7 inch AMOLED",
        },
        {
            key: "processor",
            label: "Processor",
            type: "text",
            placeholder: "e.g., Snapdragon 8 Gen 2",
        },
        {
            key: "ram",
            label: "RAM",
            type: "select",
            options: ["4GB", "6GB", "8GB", "12GB", "16GB"],
        },
        {
            key: "storage",
            label: "Storage",
            type: "select",
            options: ["64GB", "128GB", "256GB", "512GB", "1TB"],
        },
        {
            key: "batteryCapacity",
            label: "Battery Capacity",
            type: "number",
            placeholder: "e.g., 5000",
            unit: "mAh",
            min: 0,
            max: 10000,
        },
        {
            key: "camera",
            label: "Camera",
            type: "text",
            placeholder: "e.g., 108MP + 12MP + 8MP",
        },
        {
            key: "operatingSystem",
            label: "Operating System",
            type: "select",
            options: ["Android", "iOS"],
        },
        {
            key: "screenResolution",
            label: "Screen Resolution",
            type: "text",
            placeholder: "e.g., 2400 x 1080",
        },
    ],
    Laptop: [
        {
            key: "processor",
            label: "Processor",
            type: "text",
            placeholder: "e.g., Intel Core i7-13700H",
        },
        {
            key: "ram",
            label: "RAM",
            type: "select",
            options: ["8GB", "16GB", "32GB", "64GB"],
        },
        {
            key: "storage",
            label: "Storage",
            type: "select",
            options: ["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD", "1TB HDD"],
        },
        {
            key: "display",
            label: "Display",
            type: "text",
            placeholder: "e.g., 15.6 inch FHD IPS",
        },
        {
            key: "graphics",
            label: "Graphics",
            type: "text",
            placeholder: "e.g., NVIDIA RTX 4060",
        },
        {
            key: "operatingSystem",
            label: "Operating System",
            type: "select",
            options: ["Windows 11", "Windows 10", "macOS", "Linux", "No OS"],
        },
        {
            key: "screenSize",
            label: "Screen Size",
            type: "number",
            placeholder: "e.g., 15.6",
            unit: "inches",
            min: 10,
            max: 20,
            step: 0.1,
        },
        {
            key: "weight",
            label: "Weight",
            type: "number",
            placeholder: "e.g., 1.8",
            unit: "kg",
            min: 0,
            step: 0.1,
        },
    ],
    Camera: [
        {
            key: "sensor",
            label: "Sensor",
            type: "text",
            placeholder: "e.g., Full Frame CMOS",
        },
        {
            key: "lensMount",
            label: "Lens Mount",
            type: "select",
            options: ["Canon EF", "Canon RF", "Nikon F", "Nikon Z", "Sony E", "Micro Four Thirds"],
        },
        {
            key: "megapixels",
            label: "Megapixels",
            type: "number",
            placeholder: "e.g., 24",
            unit: "MP",
            min: 0,
            max: 200,
        },
        {
            key: "isoRange",
            label: "ISO Range",
            type: "text",
            placeholder: "e.g., 100-51200",
        },
        {
            key: "videoResolution",
            label: "Video Resolution",
            type: "select",
            options: ["1080p", "4K 30fps", "4K 60fps", "8K"],
        },
        {
            key: "imageStabilization",
            label: "Image Stabilization",
            type: "boolean",
        },
        {
            key: "weight",
            label: "Weight",
            type: "number",
            placeholder: "e.g., 650",
            unit: "g",
            min: 0,
            step: 1,
        },
    ],
    Accessories: [
        {
            key: "compatibility",
            label: "Compatibility",
            type: "text",
            placeholder: "e.g., iPhone 14, Samsung S23",
        },
        {
            key: "material",
            label: "Material",
            type: "select",
            options: ["Plastic", "Metal", "Silicone", "Leather", "Fabric", "Glass"],
        },
        {
            key: "dimensions",
            label: "Dimensions",
            type: "text",
            placeholder: "e.g., 150 x 75 x 8 mm",
        },
        {
            key: "weight",
            label: "Weight",
            type: "number",
            placeholder: "e.g., 50",
            unit: "g",
            min: 0,
            step: 0.1,
        },
        {
            key: "color",
            label: "Color",
            type: "text",
            placeholder: "e.g., Black, White, Blue",
        },
    ],
};

// Helper function để tạo empty specifications object
export const createEmptySpecifications = (category) => {
    const fields = specificationSchema[category] || [];
    return fields.reduce((acc, field) => {
        if (field.type === "boolean") {
            acc[field.key] = false;
        } else if (field.type === "number") {
            acc[field.key] = null;
        } else {
            acc[field.key] = "";
        }
        return acc;
    }, {});
};

// Helper function để format giá trị hiển thị
export const formatSpecificationValue = (field, value) => {
    if (value === null || value === undefined || value === "") {
        return "—";
    }

    if (field.type === "boolean") {
        return value ? "Yes" : "No";
    }

    if (field.type === "number" && field.unit) {
        return `${value} ${field.unit}`;
    }

    return String(value);
};

// Helper function để so sánh giá trị (dùng trong comparison)
export const compareSpecificationValues = (field, value1, value2) => {
    if (field.type === "number") {
        const num1 = parseFloat(value1) || 0;
        const num2 = parseFloat(value2) || 0;
        if (num1 > num2) return { better: "first", difference: num1 - num2 };
        if (num2 > num1) return { better: "second", difference: num2 - num1 };
        return { better: "equal", difference: 0 };
    }
    return null;
};

