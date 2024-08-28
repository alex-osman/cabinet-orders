import React, { useState } from "react";
import axios from "axios";
import { ConfigurationType } from "./enums/configuration-type.enum";
import { StyleType } from "./enums/StyleType.enum";
import { useNavigate } from "react-router-dom";
import "./CabinetForm.css";

interface Cabinet {
  width: number;
  height: number;
  depth: number;
  configurationType: ConfigurationType;
  style: StyleType;
}

const INITIAL_WIDTH = 15;
const INITIAL_HEIGHT = 15;
const DEPTH = 21;

const configurationImages = {
  [ConfigurationType.TWO_DRAWER]: require("./assets/images/b-2d-r01.png"),
  [ConfigurationType.THREE_DRAWER]: require("./assets/images/b-3d.png"),
  [ConfigurationType.DOOR]: require("./assets/images/bs.png"),
  [ConfigurationType.DOOR_FALSE_FRONT]: require("./assets/images/bs-ff.png"),
};

const CabinetForm: React.FC = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState<string>("");
  const [cabinets, setCabinets] = useState<Cabinet[]>([
    {
      width: INITIAL_WIDTH,
      height: INITIAL_HEIGHT,
      depth: DEPTH,
      configurationType: ConfigurationType.TWO_DRAWER,
      style: StyleType.SEGMENT,
    },
  ]);

  const updateCabinet = (index: number, key: keyof Cabinet, value: any) => {
    const updatedCabinets = cabinets.map((cabinet, i) =>
      i === index ? { ...cabinet, [key]: value } : cabinet
    );
    setCabinets(updatedCabinets);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      customerName,
      cabinets,
    };

    try {
      await axios.post("http://localhost:4000/orders", orderData);
      alert("Order created successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Create New Vanity Order</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <label htmlFor="customerName" className="form-label">
                  Customer Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
            </div>

            {cabinets.map((cabinet, index) => (
              <div key={index} className="cabinet-section col-12">
                <h5 className="cabinet-header">Cabinet {index + 1}</h5>

                <div className="row configuration-row">
                  <div className="cabinet-width col-md-4">
                    {/* Width */}
                    <label htmlFor={`width-${index}`} className="form-label">
                      Width
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      id={`width-${index}`}
                      value={cabinet.width}
                      onChange={(e) =>
                        updateCabinet(
                          index,
                          "width",
                          parseFloat(e.target.value)
                        )
                      }
                      min={15}
                      max={30.75}
                      step={0.25}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    {/* Height */}
                    <label htmlFor={`height-${index}`} className="form-label">
                      Height
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      id={`height-${index}`}
                      value={cabinet.height}
                      onChange={(e) =>
                        updateCabinet(
                          index,
                          "height",
                          parseFloat(e.target.value)
                        )
                      }
                      min={15}
                      max={30.75}
                      step={0.25}
                      required
                    />
                  </div>
                </div>

                <div className="row configuration-row">
                  <div className="col-md-4">
                    {/* Configuration */}
                    <label
                      htmlFor={`configuration-${index}`}
                      className="form-label"
                    >
                      Configuration
                    </label>
                    <select
                      id={`configuration-${index}`}
                      className="form-select"
                      value={cabinet.configurationType}
                      onChange={(e) =>
                        updateCabinet(
                          index,
                          "configurationType",
                          e.target.value as ConfigurationType
                        )
                      }
                      required
                    >
                      <option value="">Select configuration</option>
                      <option value={ConfigurationType.TWO_DRAWER}>
                        2 Drawers
                      </option>
                      <option value={ConfigurationType.THREE_DRAWER}>
                        3 Drawers
                      </option>
                      <option value={ConfigurationType.DOOR}>Door</option>
                      <option value={ConfigurationType.DOOR_FALSE_FRONT}>
                        Door with False Front
                      </option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={`style-${index}`} className="form-label">
                      Style
                    </label>
                    <select
                      id={`style-${index}`}
                      className="form-select"
                      value={cabinet.style}
                      onChange={(e) =>
                        updateCabinet(
                          index,
                          "style",
                          e.target.value as StyleType
                        )
                      }
                      required
                    >
                      <option value="">Select style</option>
                      <option value={StyleType.SEGMENT}>Segment</option>
                      <option value={StyleType.SLAB}>Slab</option>
                      <option value={StyleType.BEADED}>Beaded</option>
                      <option value={StyleType.REVEAL}>Reveal</option>
                      <option value={StyleType.BEVEL}>Bevel</option>
                    </select>
                  </div>
                </div>
                {cabinet.configurationType && (
                  <div className="row configuration-type">
                    <div className="col-12">
                      <h4>Summary</h4>
                    </div>

                    <div className="col-12">
                      <pre>{JSON.stringify(cabinet, null, 2)}</pre>
                    </div>

                    <div className="col-12">
                      <img
                        src={configurationImages[cabinet.configurationType]}
                        alt={cabinet.configurationType}
                        style={{ width: "100%", maxWidth: "100px" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button type="submit" className="btn btn-primary">
              Submit Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CabinetForm;
