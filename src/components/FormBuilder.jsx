import { useState } from "react";
import "./FormBuilder.css";
import { Trash, Eye, Search, User, Home, Phone, Mail } from "lucide-react";

const fieldOptions = [
  { type: "name", label: "Name", fields: ["First Name", "Last Name"], icon: <User size={24} /> },
  { type: "address", label: "Address", fields: ["Street", "City", "State", "Zip Code"], icon: <Home size={24} /> },
  { type: "phone", label: "Phone", fields: ["Phone Number"], icon: <Phone size={24} /> },
  { type: "email", label: "Email", fields: ["Email Address"], icon: <Mail size={24} /> },
];

export default function FormBuilder() {
  const [formFields, setFormFields] = useState([]);
  const [preview, setPreview] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState(null);
  const [subFieldToDelete, setSubFieldToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const addField = (type) => {
    const field = fieldOptions.find((f) => f.type === type);
    if (field) {
      setFormFields([...formFields, { ...field, id: Date.now(), subFields: field.fields }]);
    }
  };

  const confirmDeleteField = (id) => {
    setFieldToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteSubField = (fieldId, subField) => {
    setFieldToDelete(fieldId);
    setSubFieldToDelete(subField);
    setShowDeleteConfirmation(true);
  };

  const removeField = () => {
    if (subFieldToDelete) {
      // Remove the specific subField
      setFormFields(formFields.map(field => {
        if (field.id === fieldToDelete) {
          const updatedSubFields = field.subFields.filter(sub => sub !== subFieldToDelete);
          // If no subFields left, remove the field
          if (updatedSubFields.length === 0) {
            return null; // Return null to filter out this field later
          }
          return {
            ...field,
            subFields: updatedSubFields,
          };
        }
        return field;
      }).filter(field => field !== null)); // Filter out any fields that were removed
    } else {
      // Remove the entire field
      setFormFields(formFields.filter((field) => field.id !== fieldToDelete));
    }
    setShowDeleteConfirmation(false);
    setFieldToDelete(null);
    setSubFieldToDelete(null);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Basic Info</h2>
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input 
              type="text"
              className="search-bar"
              placeholder="Search fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sidebar Buttons in Grid Layout */}
        <div className="sidebar-buttons">
          {fieldOptions
              .filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((option) => (
                  <button key={option.type} className="button" onClick={() => addField(option.type)}>
                      <span className="button-icon">{option.icon}</span>
                      {option.label}
                  </button>
              ))}
        </div>
      </div>

      {/* Form Builder */}
      <div className="form-builder">
        <h2>Model</h2>
        <div className="form-container">
          {formFields.length === 0 && <p className="no-fields">Drag fields from the left panel and drop here.</p>}
          {formFields.map((field) => (
            <div key={field.id} className="form-field">
              <div>
                <h3>{field.label}</h3>
                {field.subFields.map((subField, index) => (
                  <div key={index} className="sub-field-container">
                    <input placeholder={subField} className="input-field" />
                    <button 
                      className="delete-button" 
                      onClick={() => confirmDeleteSubField(field.id, subField)} 
                      aria-label="Delete"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                className="delete-button1" 
                onClick={() => confirmDeleteField(field.id)} 
                aria-label="Delete"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>
        <button className="access-form-button" onClick={() => setPreview(true)}>
          <Eye className="icon" size={16} /> Access Form
        </button>
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="modal-overlay">
          <div className="preview-modal">
            <h2>Preview Form</h2>
            {formFields.map((field) => (
              <div key={field.id} className="preview-field">
                <h3>{field.label}</h3>
                {field.subFields.map((subField, index) => (
                  <input key={index} placeholder={subField} className="input-field" />
                ))}
              </div>
            ))}
            {/* Button Container */}
      <div className="button-container">
        <button className="submit-button">Submit</button>
        <button className="close-button" onClick={() => setPreview(false)}>Close</button>
      </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h2>Are you sure you want to delete this field?</h2>
            <button className="delete-button2" onClick={removeField}>Yes, Delete</button>
            <button className="close-button" onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
