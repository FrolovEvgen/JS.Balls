/**
 * Объект конфигурации и управления блоком жизней.
 */
function createLifes() {
    return {
        // Количество жизней.
        _value: 0,

        // Флаг отрисовки.
        _hidden: false,

        // ИД блока.
        _id: "lifes",

        // ХТМЛ элемент компонента.
        _el: null,

        //  ХТМЛ элемент родительского блока.
        _parentEl: null,

        // Флаг отрисовки.
        _rendered: false,

        /**
         * Инициализация приложения.
         */
        init: function() {
            this._el = document.createElement("div");
            this._el.id = this._id;
        },

        /**
         * Получить количество жизней.
         * @return         Текущее кол-во жизней.
         */
        getValue: function() {
            return this._value;
        },

        /**
         * Инициализация приложения.
         * @param value        Количество жизней.
         */
        setValue: function(value) {
            this._value = value;
        },

        /**
         * Проверить скрытие объекта.
         * @return     Текущее значание. Если True - то скрыто.
         */
        isHidden: function() {
            return this._hidden;
        },

        /**
         * Задать скрытие объекта.
         * @param value     Флаг скрытия.
         */
        setHidden: function(value) {
            this._hidden = value;
        },

        /**
         * Получить ИД объекта.
         * @return ИД объекта.
         */
        getId: function() {
            return this._id;
        },

        /**
         * Получить ХТМЛ блок объекта.
         * @return ХТМЛ елемент.
         */
        getEl: function() {
            return this._el;
        },

        /**
         * Получить ХТМЛ блок родителя.
         * @return ХТМЛ елемент.
         */
        getParentEl: function() {
            return this._parentEl;
        },

        /**
         * Задать элемент куда будет отрисован компонент.
         * @param htmEl ХТМЛ елемент.
         */
        renderTo: function(htmlEl) {
            this._parentEl = htmlEl;
        },

        /**
         * Отрисовать объект.
         */
        render: function() {

            // Не даем удалять удаленный компонент и наоборот.
            if (this.isHidden()) {
                if (this._rendered) {
                    this._el.remove();
                    this._rendered = false;
                }
            } else {
                if (!this._rendered) {
                    var parent = this.getParentEl();
                    parent.appendChild(this.getEl());
                    this._rendered = true;
                }
            }

            // Очищаем блок.
            this._el.innerText = "";

            // отрисовывем текущее количество жизней.
            var counter = 0;
            while(counter < this._value) {
                var span = document.createElement("span");
                span.className = "pl";
                this._el.appendChild(span);
                counter++;
            }
        }
    };
}

