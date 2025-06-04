import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import fondo from "../assets/Juego.jpeg";
import "../style/MyPost.css"; // Asegurate de que esta hoja tenga los estilos usados

export default function MyPost() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/64/64572.png";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://sentidos-front-lkxh.vercel.app/posts");
        const data = await res.json();

        // Filtrar por autor
        const postsDelUsuario = data.filter(
          (post) => post.autor === user.nombre
        );

        setPosts(postsDelUsuario);
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener posts:", error);
        setCargando(false);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Querés eliminar este post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://sentidos-front-lkxh.vercel.app/posts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!res.ok) throw new Error("No se pudo eliminar el post");

        Swal.fire(
          "Eliminado",
          "El post fue eliminado correctamente",
          "success"
        );

        setPosts(posts.filter((post) => post._id !== id));
      } catch (error) {
        Swal.fire(
          "Error",
          error.message || "No se pudo eliminar el post",
          "error"
        );
      }
    }
  };

  if (!user) {
    return <p>Debés iniciar sesión para ver tus publicaciones.</p>;
  }

  if (cargando) {
    return <p>Cargando publicaciones...</p>;
  }

  return (
    <div className="mis-posts-container">
      <h2>Mis publicaciones</h2>
      {posts.length === 0 ? (
        <p>No tenés publicaciones aún.</p>
      ) : (
        posts.map((post) => {
          const backgroundImage = post.portada
            ? `url(${post.portada})`
            : `url(${fondo})`;

          return (
            <div
              key={post._id}
              className="post-card"
              style={{
                backgroundImage,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="post-content-overlay">
                <div className="post-header">
                  <img
                    src={post.avatar || DEFAULT_AVATAR}
                    alt="avatar"
                    className="avatar"
                  />
                  <div>
                    <h3>{post.titulo}</h3>
                    <h4 className="autor">Por: {post.autor}</h4>
                  </div>
                </div>
                <p>{post.epigrafe}...</p>
                <div className="post-actions">
                  <button onClick={() => navigate(`/editar/${post._id}`)}>
                    Editar
                  </button>
                  <button onClick={() => handleEliminar(post._id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
