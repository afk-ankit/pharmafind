import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/Login.css";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import usePharmacyLogin from "../hooks/usePharmacyLogin";

const pharmacySchema = z.object({
  name: z.string().min(1, "name cannot be empty"),
  license_no: z.string().min(1, "license number cannot be empty"),
});

const LoginPharmacy = () => {
  const form = useForm({
    resolver: zodResolver(pharmacySchema),
  });

  const { mutate, isPending } = usePharmacyLogin();
  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <div className="login-container">
          <div className="login-header">
            <h2>Sign in to your Admin account</h2>
            <p>
              Or <Link to="/register">Register your pharmacy</Link>
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="login-form">
            <div className="form-group">
              <label htmlFor="license_no">License Number</label>
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
            <div className="form-group">
              <label htmlFor="name">Pharmacy Name</label>
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
            <button
              type="submit"
              disabled={isPending}
              className={`submit-button`}
            >
              Login
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPharmacy;
