import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import usePharmacyMutation from "../hooks/usePharmacyMutation";

const pharmacySchema = z.object({
  name: z.string().min(1, "name cannot be empty"),
  location: z.string().min(1, "location cannot be empty"),
  contact_no: z.string().min(1, "contact_no cannot be empty"),
  email: z.string().min(1, "email cannot be empty"),
  license_no: z.string().min(1, "license_no cannot be empty"),
});

const RegisterPharmacy = () => {
  const form = useForm({
    resolver: zodResolver(pharmacySchema),
  });
  const { mutate } = usePharmacyMutation();

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <div className="register-container">
          <div className="register-header">
            <h2>Register Your Pharmacy</h2>
            <p>
              Already registered? <Link to="/login">Sign in</Link>
            </p>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="register-form"
          >
            {/* Existing fields */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <span className="error-message">
                  {form.formState.errors.name.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                {...form.register("location")}
              />
              {form.formState.errors.location && (
                <span className="error-message">
                  {form.formState.errors.location.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="contact_no">Contact Number</label>
              <input
                id="contact_no"
                name="contact_no"
                type="text"
                {...form.register("contact_no")}
              />
              {form.formState.errors.contact_no && (
                <span className="error-message">
                  {form.formState.errors.contact_no.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <span className="error-message">
                  {form.formState.errors.email.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="license_no ">License Number</label>
              <input
                id="license_no"
                name="license_no"
                type="text"
                {...form.register("license_no")}
              />
              {form.formState.errors.license_no && (
                <span className="error-message">
                  {form.formState.errors.license_no.message}
                </span>
              )}
            </div>
            <button type="submit" className={`submit-button`}>
              Register Pharmacy
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPharmacy;
