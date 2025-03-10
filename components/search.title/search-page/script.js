'use strict';
$(document).ready(function($) {

    // Search Input
    // ============
    var $searchInput = $('.form-search__input');
    var $formSearch = $('.form-search');
    var $searchHeader = $('.header-search__hidden');
    var $headerSearchModalBtn = $('.header-search-modal__img-icon-search');

    $searchInput
        .on('keydown', function() {
            var $self = $(this);
            if ($self.val() === '') {
                $self.siblings('button').prop('disabled', true);
            } else {
                $self.siblings('button').prop('disabled', false);
            }
        })
        .on('paste', function(event) {
            var $self = $(this);

            // получаем данные из буфера
            var transferData = event.clipboardData ||
                event.originalEvent.clipboardData ||
                window.clipboardData;
            var clipboardData = transferData.getData('text');

            if (clipboardData === '') {
                $self.siblings('button').prop('disabled', true);
            } else {
                $self.siblings('button').prop('disabled', false);
            }
        });



    // Форма поиска
    $('.header-search__icon').on('click', function(event) {

        if ($('.header-search__hidden').hasClass('active')) {
            $('.header-search__hidden').toggleClass('active')
            document.querySelector('.header-bottom').classList.remove('search')
        } else {
            $('.header-search__hidden').toggleClass('active')
            if ($('.header-bottom').hasClass('active')) {
                document.querySelector('.header-bottom').classList.add('active')
                document.querySelector('.header-bottom').classList.add('search')
            }
        }
    });


    // обработка клика вне поиска
    $(document).on('click', function(event) {
        if ($(event.target).closest('.header-search').length ||
            $(event.target).closest('.search-header').length) {
            return;
        }
        if ($searchInput.val() !== '') {
            return;
        }
        $formSearch.removeClass('active');
        event.stopPropagation();
    });

    $headerSearchModalBtn.on('click', function(event) {
        event.preventDefault();
        $('.header-search').addClass('active');
    });

    $('.header-search__close').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $('.header-search').removeClass('active');
    });

    $('.search-header').on('click', function(event) {
        event.stopPropagation();
    });

    $('body').on('click', function() {
        $('.header-search').removeClass('active');
    });

    /**
     * Функция-конструктор возвращает объект для подстановки плейсхолдера в input с ближайшим предлагаемым вариантом набора.
     * Вариант пользователь может принять нажав стрелку вправо или tab. //TODO: Предусмотреть возможность настраивать клавиши и вешать свои обработчики
     * @param element
     * @param requestParams
     * @return {{element: Element, value: *, active: boolean, showPlaceholder: boolean, placeholder: null, placeholderValue: null, lastActive: number, init: init, setPlaceholder: setPlaceholder, setValue: setValue, resetPlaceholder: resetPlaceholder, setAutoComplete: setAutoComplete, requestResolve: requestResolve, sendRequest: sendRequest, inputHandler: inputHandler}}
     */
    function autoCompleteByRequest(element, requestParams) {

        var request = {
            url: requestParams ? requestParams.url : '/',
            data: requestParams ? requestParams.data : {}
        };

        if (!element) {
            throw new DOMException('Не передан параметр с селектором!');
        }

        var object = {
            element: document.querySelector(element),
            value: element.value,
            active: true,
            showPlaceholder: false,
            placeholder: null,
            placeholderValue: null,
            lastActive: 0,
            /**
             * Инициализация компонента
             */
            init: function() {
                if (!this.element) {
                    throw new DOMException('Элемент с таким селектором не найден!');
                }
                this.placeholder = document.createElement('div');
                this.placeholder.classList.add('cases-placeholder');

                this.element.insertAdjacentElement('afterEnd', this.placeholder);
            },

            /**
             * Устанавливает текст плейсхолдера
             * @param string
             */
            setPlaceholder: function(string) {
                this.placeholderValue = string;
                this.placeholder.innerText = string;
            },
            /**
             * Задает значение в input
             * @param string
             */
            setValue: function(string) {
                this.element.value = string;
                this.value = string;
            },
            /**
             * Сбрасывает значение плейсхолдера
             */
            resetPlaceholder: function() {
                this.setPlaceholder('');
            },
            /**
             * Выбирает первое значение из массива вариантов
             * @param array
             */
            setAutoComplete: function(array) {

                var currentValue = this.value;
                var valueArray = array.filter(function(item) {
                    return item.NAME.length > currentValue.length;
                });

                if (valueArray.length) {
                    var value = valueArray[0].NAME;
                    this.setPlaceholder(value);
                }

            },
            /**
             * Обработка данных с сервера
             * @param data
             */
            requestResolve: function(data) {
                this.resetPlaceholder();
                if (data.length) {
                    this.setAutoComplete(JSON.parse(data.replace(/\'/g, '"')));
                } else {
                    this.lastActive = this.value.length;
                    this.active = false;
                }
            },
            /**
             * Отправка запроса
             */
            sendRequest: function() {
                BX.ajax.post(
                    request.url, { "search": this.value },
                    this.requestResolve)
            },
            /**
             * Обработка ввода пользователя в поле
             * @param e
             */
            inputHandler: function(e) {
                this.resetPlaceholder();
                if (this.active || this.lastActive >= e.target.value.length) {
                    this.value = e.target.value;
                    if (this.value) {
                        this.sendRequest();
                    } else {
                        this.resetPlaceholder();
                    }
                }
            },
        };

        /* Привязка функций к контексту объекта */
        object.inputHandler = object.inputHandler.bind(object);
        object.requestResolve = object.requestResolve.bind(object);
        object.setAutoComplete = object.setAutoComplete.bind(object);
        object.setPlaceholder = object.setPlaceholder.bind(object);
        object.resetPlaceholder = object.resetPlaceholder.bind(object);
        object.setValue = object.setValue.bind(object);

        /**
         * Вешает обработчики
         */
        object.element.addEventListener('input', object.inputHandler);
        object.element.addEventListener('click', object.resetPlaceholder);
        object.element.addEventListener('keydown', function(e) {
            if (object.placeholderValue) {
                if ((e.which === 39 || e.which === 9) && '' + object.placeholderValue.length > object.value.length) {
                    object.setValue(object.placeholderValue);
                }

            }
        });

        return object;
    }

    var inputSearchModal = autoCompleteByRequest('#title-search-input-desktop', { url: '/bitrix/components/bitrix/search.suggest.input/search.php' });
    var inputSearchModal2 = autoCompleteByRequest('#title-search-input-mobile', { url: '/bitrix/components/bitrix/search.suggest.input/search.php' });
    inputSearchModal.init();
    inputSearchModal2.init();
});