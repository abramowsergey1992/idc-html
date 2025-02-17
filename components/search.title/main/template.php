<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true); ?>
<?php $this->addExternalCss('/local/static/node_modules/perfect-scrollbar/css/perfect-scrollbar.css') ?>
<?php $this->addExternalJs('/local/static/node_modules/perfect-scrollbar/dist/perfect-scrollbar.js') ?>
<?php
$INPUT_ID = trim($arParams["~INPUT_ID"]);
if (strlen($INPUT_ID) <= 0) {
    $INPUT_ID = "title-search-input";
}
$INPUT_ID = CUtil::JSEscape($INPUT_ID);

$CONTAINER_ID = trim($arParams["~CONTAINER_ID"]);
if (strlen($CONTAINER_ID) <= 0) {
    $CONTAINER_ID = "title-search-main";
}
$CONTAINER_ID = CUtil::JSEscape($CONTAINER_ID);

if ($arParams["SHOW_INPUT"] !== "N") : ?>
    <div class="search-header">
        <div class="search-header__icon">
            <img loading="lazy" src="/local/templates/.default/images/search.svg" alt="search icon">
        </div>
        <div class="search-header__wrapper" style="z-index: 10 !important;" id="<?= $CONTAINER_ID ?>">
            <form action="<?= $arResult["FORM_ACTION"] ?>" class="form-search">
                <button class="form-search__img" name="s" type="submit" value="<?= GetMessage("CT_BST_SEARCH_BUTTON"); ?>"><img loading="lazy" src="/local/templates/.default/images/search.svg" alt="search icon"></button>
                <input id="<?= $INPUT_ID ?>" class="form-search__input" placeholder="Что вы ищете?" type="search" name="q" value="" autocomplete="off" />
                <div class="close-icon-search"><img loading="lazy" src="/local/templates/.default/images/close-icon.svg" alt="close icon"></div>
            </form>
        </div>
    </div>
<?php endif; ?>

<script>
    BX.ready(function() {
        new JCTitleSearch({
            'AJAX_PAGE': '<?= CUtil::JSEscape(POST_FORM_ACTION_URI) ?>',
            'CONTAINER_ID': '<?= $CONTAINER_ID ?>',
            'INPUT_ID': '<?= $INPUT_ID ?>',
            'MIN_QUERY_LEN': 3
        });
        // Шляпа для двойного нажатия на кнопку поиска
        // if ($(window).width() > 1199) {
        //     if ($('#title-search-input-desktop').val() == '') {
        //         $('.form-search__img').click(function(e) {
        //             e.preventDefault()
        //             $('#title-search-input-desktop').trigger("focus")
        //             $('.form-search__img').off()
        //         })
        //     } else {
        //         $('.form-search__img').trigger("submit")
        //     }
        // }
    });
    // Шляпа для двойного нажатия на кнопку поиска
    // if ($(window).width() > 1199) {
    //     $('.form-search__img').click(function(e) {
    //         if ($('#title-search-input-desktop').val() == '') {
    //             e.preventDefault()
    //             $('#title-search-input-desktop').trigger("focus")
    //             $('.form-search__img').off()
    //         } else {
    //             $('.form-search__img').trigger("submit")
    //         }
    //     })
    // }
</script>