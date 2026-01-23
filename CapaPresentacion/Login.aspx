<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CapaPresentacion.Login" %>

<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login - Avanzar Orden y Desarrollo</title>
    <link href="vendor/toastr/toastr.min.css" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: #f1f1f1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .login-container {
            background: #ffffff;
            width: 380px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            padding: 30px;
            text-align: center;
        }

            .login-container img {
                width: 100%;
                border-radius: 8px;
                margin-bottom: 20px;
            }

        h2 {
            color: #1cc88a;
            margin-bottom: 20px;
        }

        input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border-radius: 6px;
            border: 1px solid #cfd1d4;
            font-size: 15px;
            box-sizing: border-box; /* Evita que el padding empuje el input hacia la derecha */
        }

        button {
            width: 100%;
            padding: 12px;
            background: #1cc88a;
            border: none;
            border-radius: 6px;
            color: white;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
            transition: 0.2s;
        }

            button:hover {
                background: #17a673;
            }

        .links {
            margin-top: 15px;
        }

            .links a {
                display: block;
                text-decoration: none;
                font-size: 14px;
                margin-top: 6px;
                color: #1cc88a;
            }

                .links a:hover {
                    text-decoration: underline;
                }

        @media (max-width: 480px) {
            .login-container {
                width: 90%;
                padding: 20px;
            }

                .login-container img {
                    max-width: 100%;
                }
        }
    </style>
</head>
<body>
    <div class="login-container">
        <!-- Sustituir ruta de imagen cuando se integre -->
        <img src="Imagenes/logoAvanzar.png" alt="Logo partido Avanzar Orden y Desarrollo" />

        <h2>Acceso al Sistema</h2>

        <form>
            <input type="text" id="usuario" name="correo" placeholder="Correo" value="zerodev32@gmail.com" />
            <input type="password" id="password" name="clave" placeholder="Contraseña" value="123456789" />
            <button type="button" id="btnInicia">Iniciar Sesión</button>
        </form>

        <div class="links">
            <a href="#">¿Olvidaste tu contraseña?</a>
            <a href="#">Volver a la página principal</a>
        </div>
    </div>
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/toastr/toastr.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="vendor/loadingoverlay/loadingoverlay.min.js"></script>
    <script src="jsdev/Login.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <%--<script src="jsdev/Login.js" type="text/javascript"></script>--%>
</body>
</html>
