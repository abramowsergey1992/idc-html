<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}
?>
<?php if (!empty($arResult["CATEGORIES"])) { ?>
    <div class="table">
        <?php foreach ($arResult["CATEGORIES"] as $category_id => $arCategory) { ?>
            <?php foreach ($arCategory["ITEMS"] as $i => $arItem) { ?>
                <div class="table-row" style=" <?if ($arItem['ARCHIVE'] === 'true') { echo 'display:none'; } else {echo 'order:1';} ?> " >
                    <?php if (isset($arItem["ICON"])) { ?>
                        <a href="<?= $arItem["URL"] ?>">
                            <div class="title-search-item__pic <?if ($arItem['ARCHIVE'] === 'true') echo 'archive'?>">
                                <? if ($arItem['ARCHIVE'] === 'true') : ?>
                                    <span>Архив</span>
                                <? endif; ?>
                                <img  loading="lazy" src="<?= $arItem["ICON"] ?>">
                            </div>
                            <div class="title-search-item__desc">
                            <? if ($arItem["NAME"] === "остальные") {
                        continue;
                        } ?>
                                <?= $arItem["NAME"] ?>
                            </div>
                        </a>
                    <?php } else if (!isset($arItem["ICON"]) && $category_id !== "all") {?>
                        <a href="<?= $arItem["URL"] ?>">
                            <div class="title-search-item__desc">
                            <? if ($arItem["NAME"] === "остальные") {
                        continue;
                        } ?>
                                <?= $arItem["NAME"] ?>
                            </div>
                        </a>
                    <?php } ?> 
                </div>
            <?php } ?>
        <?php } ?>
    </div>
    <a href="<?=$arItem["URL"]?>" class="base-href doublearrow" style="margin-bottom:10px">Все результаты</a>
<?php } ?>
<style>
    .base-href.doublearrow:after {
        left: 125px;
    }
</style>