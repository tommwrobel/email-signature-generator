<!doctype html>

<html lang="pl">

<head>
    <meta charset="utf-8">
    <title>Generator stopek</title>
    <meta name="description" content="Generator stopek">

    <link rel="stylesheet" href="style/style.css?ver=<?php echo rand(); ?>" type="text/css">
    <link rel="shortcut icon" href="img/fav.png">

    <script src="script/jquery-3.5.1.min.js" type="text/javascript"></script>
    <script src="script/main.js?ver=<?php echo rand(); ?>" type="text/javascript"></script>

</head>

<body>

<!--form-->

<div id="generator_form">
    <h1>Generator stopek</h1>
    <form>
        <label for="person_select">Wybierz pracownika:</label>
        <select id="person_select" onchange="fillForm(this.value);">
            <option value="-1">-</option>
        </select>

        <label for="form_name">Imię i nazwisko:</label>
        <input type="text" id="form_name"/>

        <label for="form_job_title">Stanowisko:</label>
        <input type="text" id="form_job_title"/>

        <div style="float: left; width: 48%;">
            <label for="form_phone1">Nr telefonu #1:</label>
            <input type="text" id="form_phone1"/>
        </div>

        <div style="float: right; width: 48%;">
            <label for="form_phone2">Nr telefonu #2:</label>
            <input type="text" id="form_phone2"/>
        </div>
        <div style="clear: both;"></div>

        <label for="form_email">Adres email:</label>
        <input type="text" id="form_email"/>

        <div id="add_photo">

            <?php
                $files = glob("data/profile_img/*.*");

                if(count($files) > 0) {
                    echo '<label for="profile_image_select">Wybierz dostępne zdjęcie profilowe <i>(opcjonalnie)</i>:</label>
                                    <select id="ftr_profile_image_select" onchange="changeProfileUrl(this.value);">
                                    <option value="1">Brak zdjęcia</option>';
                        foreach($files as $file) {
                            echo '<option value="'.basename($file).'">'.basename($file).'</option>';
                        }
                    echo '</select>';
                }
            ?>

            <label for="form_profile_image_url">...lub wpisz adres URL zdjęcia profilowego:</label>
            <input type="url" id="form_profile_image_url"/>
        </div>

        <div class="buttons">
            <a class="primary-button" href="#" onclick="openModal();">Generuj stopkę!</a>
        </div>
    </form>
</div>

<!--endform-->

<!--modal-->

<div id="ftr_modal">
    <div id="modal_body">
        <h2 style="margin-bottom: 5px">Podgląd stopki</h2>
        <div id="message">Stopka skopiowana do schowka!</div>

        <div id="footer_body">

            <?php include("data/template.html") ?>
            
            <div style="clear:both"></div>
        </div>

        <div class="buttons" style="flex-basis: 100%;">
            <a class="primary-button" href="#" onclick="copyToClipboard();">Kopiuj stopkę!</a>
            <a class="secondary-button" href="#" onclick="closeModal();">Wróć do edycji</a>
        </div>
    </div>
</div>

<!--end_modal-->

</body>
</html>