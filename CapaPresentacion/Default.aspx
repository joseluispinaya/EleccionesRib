<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="CapaPresentacion.Default" %>

<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Nombre Agrupacion</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="" name="keywords">
    <meta content="" name="description">

    <!-- Favicon -->
    <%--<link href="img/favicon.ico" rel="icon">--%>

    <!-- Google Web Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">

    <%--<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>--%>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">  

    <!-- Icon Font Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Libraries Stylesheet -->
    <link href="recursos/lib/animate/animate.min.css" rel="stylesheet">
    <link href="recursos/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">

    <!-- Customized Bootstrap Stylesheet -->
    <link href="recursos/css/bootstrap.min.css" rel="stylesheet">

    <!-- Template Stylesheet -->
    <link href="recursos/css/style.css" rel="stylesheet">
    <%--<link href="recursos/css/style.css?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" rel="stylesheet" />--%>
</head>

<body>
    <div class="container-xxl bg-white p-0">
        <!-- Spinner Start -->
        <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Cargando...</span>
            </div>
        </div>
        <!-- Spinner End -->


        <!-- Navbar & Hero Start -->
        <div class="container-xxl position-relative p-0">
            <nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                <a href="#" class="navbar-brand p-0">
                    <h1 class="m-0"><i class="fa fa-server me-3"></i>Agrupacion</h1>
                     <!-- <img src="img/logoAvanzar.png" alt="Logo" style="height: 70px; max-width: 150px;"> -->
                    <!-- <img src="img/logo.png" alt="Logo"> -->
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto py-0">
                        <a href="Default.aspx" class="nav-item nav-link active">Inicio</a>
                        <a href="Login.aspx" class="nav-item nav-link">Acceder</a>
                        <!-- <a href="contact.html" class="nav-item nav-link">Contact</a> -->
                    </div>
                    <a href="#" class="btn btn-secondary py-2 px-4 ms-3">Militancia</a>
                </div>
            </nav>

            <div class="container-xxl py-5 bg-primary hero-header mb-5">
                <div class="container my-5 py-5 px-lg-5">
                    <div class="row g-5">
                        <div class="col-lg-6 pt-5 text-center text-lg-start">
                            <h1 class="display-4 text-white mb-4 animated slideInLeft">Orden y Desarrollo</h1>
                            <p class="text-white animated slideInLeft">Por un Municipio productivo y tecnológico con desarrollo económico mediante la aplicación de la tecnología en diversos sectores.</p>
                            <!-- <h1 class="text-white mb-4 animated slideInLeft">
                                <small class="align-top fw-normal" style="font-size: 15px; line-height: 25px;">Starting:</small>
                                <span>$2.49</span>
                                <small class="align-bottom fw-normal" style="font-size: 15px; line-height: 33px;">/ Mo</small>
                            </h1> -->
                            <br>
                            <a href="#" class="btn btn-secondary py-sm-3 px-sm-5 me-3 animated slideInLeft">Ver mas</a>
                        </div>
                        <div class="col-lg-6 text-center text-lg-start">
                            <img class="img-fluid animated zoomIn" src="recursos/img/herocate.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Navbar & Hero End -->


        <!-- Testimonial Start -->
        <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div class="container px-lg-5">
                <div class="owl-carousel testimonial-carousel">
                    <div class="testimonial-item position-relative bg-light border-top border-5 border-primary rounded p-4 my-4">
                        <div class="d-flex align-items-center justify-content-center position-absolute top-0 start-0 ms-5 translate-middle bg-primary rounded-circle" style="width: 45px; height: 45px; margin-top: -3px;">
                            <i class="fa fa-quote-left text-white"></i>
                        </div>
                        <p class="mt-3">Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                        <div class="d-flex align-items-center">
                            <img class="img-fluid flex-shrink-0 rounded-circle" src="recursos/img/testimonial-1.jpg" style="width: 50px; height: 50px;">
                            <div class="ps-3">
                                <h6 class="fw-bold mb-1">Client Name</h6>
                                <small>Profession</small>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-item position-relative bg-light border-top border-5 border-primary rounded p-4 my-4">
                        <div class="d-flex align-items-center justify-content-center position-absolute top-0 start-0 ms-5 translate-middle bg-primary rounded-circle" style="width: 45px; height: 45px; margin-top: -3px;">
                            <i class="fa fa-quote-left text-white"></i>
                        </div>
                        <p class="mt-3">Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                        <div class="d-flex align-items-center">
                            <img class="img-fluid flex-shrink-0 rounded-circle" src="recursos/img/testimonial-2.jpg" style="width: 50px; height: 50px;">
                            <div class="ps-3">
                                <h6 class="fw-bold mb-1">Client Name</h6>
                                <small>Profession</small>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-item position-relative bg-light border-top border-5 border-primary rounded p-4 my-4">
                        <div class="d-flex align-items-center justify-content-center position-absolute top-0 start-0 ms-5 translate-middle bg-primary rounded-circle" style="width: 45px; height: 45px; margin-top: -3px;">
                            <i class="fa fa-quote-left text-white"></i>
                        </div>
                        <p class="mt-3">Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                        <div class="d-flex align-items-center">
                            <img class="img-fluid flex-shrink-0 rounded-circle" src="recursos/img/testimonial-3.jpg" style="width: 50px; height: 50px;">
                            <div class="ps-3">
                                <h6 class="fw-bold mb-1">Client Name</h6>
                                <small>Profession</small>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-item position-relative bg-light border-top border-5 border-primary rounded p-4 mt-4">
                        <div class="d-flex align-items-center justify-content-center position-absolute top-0 start-0 ms-5 translate-middle bg-primary rounded-circle" style="width: 45px; height: 45px; margin-top: -3px;">
                            <i class="fa fa-quote-left text-white"></i>
                        </div>
                        <p class="mt-3">Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                        <div class="d-flex align-items-center">
                            <img class="img-fluid flex-shrink-0 rounded-circle" src="recursos/img/testimonial-4.jpg" style="width: 50px; height: 50px;">
                            <div class="ps-3">
                                <h6 class="fw-bold mb-1">Client Name</h6>
                                <small>Profession</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Testimonial End -->


        <!-- Team Start -->
        <div class="container-xxl py-5">
            <div class="container px-lg-5">
                <div class="section-title position-relative text-center mx-auto mb-5 pb-4 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                    <h1 class="mb-3">Our Team Members</h1>
                    <p class="mb-1">Vero justo sed sed vero clita amet. Et justo vero sea diam elitr amet ipsum eos
                        ipsum clita duo sed. Sed vero sea diam erat vero elitr sit clita.</p>
                </div>
                <div class="row g-4">
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="team-item border-top border-5 border-primary rounded shadow overflow-hidden">
                            <div class="text-center p-4">
                                <img class="img-fluid rounded-circle mb-4" src="recursos/img/team-1.jpg" alt="">
                                <h5 class="fw-bold mb-1">Full Name</h5>
                                <small>Designation</small>
                            </div>
                            <div class="d-flex justify-content-center bg-primary p-3">
                                <a class="btn btn-square text-primary bg-white m-1" href="#"><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square text-primary bg-white m-1" href="#"><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square text-primary bg-white m-1" href="#"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                        <div class="team-item border-top border-5 border-primary rounded shadow overflow-hidden">
                            <div class="text-center p-4">
                                <img class="img-fluid rounded-circle mb-4" src="recursos/img/team-2.jpg" alt="">
                                <h5 class="fw-bold mb-1">Full Name</h5>
                                <small>Designation</small>
                            </div>
                            <div class="d-flex justify-content-center bg-primary p-3">
                                <a class="btn btn-square text-primary bg-white m-1" href="#"><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square text-primary bg-white m-1" href="#"><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square text-primary bg-white m-1" href="#"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div class="team-item border-top border-5 border-primary rounded shadow overflow-hidden">
                            <div class="text-center p-4">
                                <img class="img-fluid rounded-circle mb-4" src="recursos/img/team-3.jpg" alt="">
                                <h5 class="fw-bold mb-1">Full Name</h5>
                                <small>Designation</small>
                            </div>
                            <div class="d-flex justify-content-center bg-primary p-3">
                                <a class="btn btn-square text-primary bg-white m-1" href="#"><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square text-primary bg-white m-1" href="#"><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square text-primary bg-white m-1" href="#"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                        <div class="team-item border-top border-5 border-primary rounded shadow overflow-hidden">
                            <div class="text-center p-4">
                                <img class="img-fluid rounded-circle mb-4" src="recursos/img/team-4.jpg" alt="">
                                <h5 class="fw-bold mb-1">Full Name</h5>
                                <small>Designation</small>
                            </div>
                            <div class="d-flex justify-content-center bg-primary p-3">
                                <a class="btn btn-square text-primary bg-white m-1" href="#"><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square text-primary bg-white m-1" href="#"><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square text-primary bg-white m-1" href="#"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Team End -->
        

        <!-- Footer Start -->
        <div class="container-fluid bg-primary text-white footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
            <div class="container py-5 px-lg-5">
                <div class="row gy-5 gx-4 pt-5">
                    <div class="col-12">
                        <h5 class="fw-bold text-white mb-4">Subscribe Our Newsletter</h5>
                        <div class="position-relative" style="max-width: 400px;">
                            <input class="form-control bg-white border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Enter your email">
                            <button type="button" class="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2">Submit</button>
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-12">
                        <div class="row gy-5 g-4">
                            <div class="col-md-6">
                                <h5 class="fw-bold text-white mb-4">About Us</h5>
                                <a class="btn btn-link" href="#">About Us</a>
                                <a class="btn btn-link" href="#">Contact Us</a>
                                <a class="btn btn-link" href="#">Privacy Policy</a>
                                <a class="btn btn-link" href="#">Terms & Condition</a>
                                <a class="btn btn-link" href="#">Support</a>
                            </div>
                            <div class="col-md-6">
                                <h5 class="fw-bold text-white mb-4">Our Services</h5>
                                <a class="btn btn-link" href="#">Domain Register</a>
                                <a class="btn btn-link" href="#">Shared Hosting</a>
                                <a class="btn btn-link" href="#">VPS Hosting</a>
                                <a class="btn btn-link" href="#">Dedicated Hosting</a>
                                <a class="btn btn-link" href="#">Reseller Hosting</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <h5 class="fw-bold text-white mb-4">Get In Touch</h5>
                        <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                        <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                        <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@example.com</p>
                        <div class="d-flex pt-2">
                            <a class="btn btn-outline-light btn-social" href="#"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-outline-light btn-social" href="#"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-outline-light btn-social" href="#"><i class="fab fa-youtube"></i></a>
                            <a class="btn btn-outline-light btn-social" href="#"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4 mt-lg-n5">
                        <div class="bg-light rounded" style="padding: 30px;">
                            <input type="text" class="form-control border-0 py-2 mb-2" placeholder="Name">
                            <input type="email" class="form-control border-0 py-2 mb-2" placeholder="Email">
                            <textarea class="form-control border-0 mb-2" rows="2" placeholder="Message"></textarea>
                            <button class="btn btn-primary w-100 py-2">Send Message</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container px-lg-5">
                <div class="copyright">
                    <div class="row">
                        <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <a class="border-bottom" href="#">Your Site Name</a>, All Right Reserved. 
							
							<!--/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/-->
							Designed By <a class="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
                            <br>
                            Distributed By <a class="border-bottom" href="https://themewagon.com" target="_blank">ThemeWagon</a>
                        </div>
                        <div class="col-md-6 text-center text-md-end">
                            <div class="footer-menu">
                                <a href="#">Home</a>
                                <a href="#">Cookies</a>
                                <a href="#">Help</a>
                                <a href="#">FQAs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer End -->


        <!-- Back to Top -->
        <a href="#" class="btn btn-lg btn-secondary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
    </div>

    <!-- JavaScript Libraries -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="recursos/lib/wow/wow.min.js"></script>
    <script src="recursos/lib/easing/easing.min.js"></script>
    <script src="recursos/lib/waypoints/waypoints.min.js"></script>
    <script src="recursos/lib/counterup/counterup.min.js"></script>
    <script src="recursos/lib/owlcarousel/owl.carousel.min.js"></script>

    <!-- Template Javascript -->
    <script src="recursos/js/main.js"></script>
</body>

</html>
