import { useState } from "react";
import axios from "axios";

export default function Form() {
  const [formData, setFormData] = useState({
    naam: "",
    voornaam: "",
    geboortedatum: "",
    haarkleur: "",
    lengte: "",
    geslacht: "",
    opmerking: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://nodemailer-server-backend.onrender.com/mail",
        formData
      );
      alert("Formulier succesvol verzonden!");
    } catch (error) {
      console.error(error);
      alert("Fout bij verzenden van formulier.");
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-8 bg-white shadow rounded-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Formulier invullen</h2>

      <input
        className="w-full p-2 border mb-3 rounded"
        name="naam"
        placeholder="Naam"
        required
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border mb-3 rounded"
        name="voornaam"
        placeholder="Voornaam"
        required
        onChange={handleChange}
      />

      <label className="block mb-2 font-semibold">Geboortedatum</label>
      <input
        className="w-full p-2 border mb-3 rounded"
        name="geboortedatum"
        type="date"
        required
        onChange={handleChange}
      />

      <label className="block mb-2">Haarkleur</label>
      <select
        className="w-full p-2 border mb-3 rounded"
        name="haarkleur"
        required
        onChange={handleChange}
        defaultValue=""
      >
        <option value="">Selecteer haarkleur</option>
        <option value="Blond">Blond</option>
        <option value="Bruin">Bruin</option>
        <option value="Zwart">Zwart</option>
        <option value="Rood">Rood</option>
        <option value="Grijs">Grijs</option>
      </select>

      <input
        className="w-full p-2 border mb-3 rounded"
        name="lengte"
        placeholder="Lengte (cm)"
        required
        onChange={handleChange}
      />

      <div className="mb-3">
        <label className="mr-4">
          <input
            type="radio"
            name="geslacht"
            value="Man"
            onChange={handleChange}
          />{" "}
          Man
        </label>
        <label className="mr-4">
          <input
            type="radio"
            name="geslacht"
            value="Vrouw"
            onChange={handleChange}
          />{" "}
          Vrouw
        </label>
        <label>
          <input
            type="radio"
            name="geslacht"
            value="X"
            onChange={handleChange}
          />{" "}
          X
        </label>
      </div>

      <textarea
        className="w-full p-2 border mb-3 rounded"
        name="opmerking"
        placeholder="Opmerking"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Verstuur
      </button>
    </form>
  );
}
