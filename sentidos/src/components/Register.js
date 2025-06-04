import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../style/Register.css';

const provincias = [
  "Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
  "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones",
  "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe",
  "Santiago del Estero", "Tierra del Fuego", "Tucumán"
];

const SocioRegister = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    provincia: '',
    ciudad: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          html: `Tu usuario y contraseña fueron enviados a <b>${form.correo}</b>.`,
        }).then(() => {
          // Redirige a la página de login después de que el usuario cierre la alerta
          window.location.href = '/login';
        });
        
        setForm({
          nombre: '', apellido: '', correo: '',
          telefono: '', provincia: '', ciudad: ''
        });
      } else {
        Swal.fire('Error', data.message || 'Fallo en el registro', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Fallo del servidor', 'error');
    }
  };

  return (
    <div className="socio-form-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} className="socio-form">
        <input type="text" name="nombre" placeholder="Nombre" required value={form.nombre} onChange={handleChange} />
        <input type="text" name="apellido" placeholder="Apellido" required value={form.apellido} onChange={handleChange} />
        <input type="email" name="correo" placeholder="Correo electrónico" required value={form.correo} onChange={handleChange} />
        <input type="text" name="telefono" placeholder="Teléfono (opcional)" value={form.telefono} onChange={handleChange} />
        
        <select name="provincia" required value={form.provincia} onChange={handleChange}>
          <option value="">Seleccioná tu provincia</option>
          {provincias.map((prov, i) => (
            <option key={i} value={prov}>{prov}</option>
          ))}
        </select>

        <input type="text" name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default SocioRegister;
