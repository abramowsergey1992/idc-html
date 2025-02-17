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
<?php $this->addExternalCss('/local/static/node_modules/perfect-scrollbar/css/perfect-scrollbar.css')?>
<?php $this->addExternalJs('/local/static/node_modules/perfect-scrollbar/dist/perfect-scrollbar.js')?>
<?php
$INPUT_ID = trim($arParams["~INPUT_ID"]);
if (strlen($INPUT_ID) <= 0) {
    $INPUT_ID = "title-search-input";
}
$INPUT_ID = CUtil::JSEscape($INPUT_ID);

$CONTAINER_ID = trim($arParams["~CONTAINER_ID"]);
if (strlen($CONTAINER_ID) <= 0) {
    $CONTAINER_ID = "title-search";
}
$CONTAINER_ID = CUtil::JSEscape($CONTAINER_ID);

if ($arParams["SHOW_INPUT"] !== "N") : ?>
    <div class="search-header">
        <div class="full-wrapper">
            <div class="search-header__wrapper" id="<?= $CONTAINER_ID ?>">
                <form action="<?= $arResult["FORM_ACTION"] ?>" class="form-search">
                    <input
                        id="<?= $INPUT_ID ?>"
                        class="form-search__input"
                        placeholder="Поиск по сайту"
                        type="search"
                        name="q"
                        value=""
                        autocomplete="off"
                    />
                    <button
                        class="form-search__img"
                        name="s"
                        type="submit"
                        value="<?=GetMessage("CT_BST_SEARCH_BUTTON");?>"
                    ></button>
                </form>
            </div>
        </div>
    </div>
<?php endif; ?>

<script>

    BX.ready(function() {
        new JCTitleSearch({
            'AJAX_PAGE':     '<?= CUtil::JSEscape(POST_FORM_ACTION_URI)?>',
            'CONTAINER_ID':  '<?= $CONTAINER_ID?>',
            'INPUT_ID':      '<?= $INPUT_ID?>',
            'MIN_QUERY_LEN': 3
        });
    });
</script>
