/**
 * Объект конфигурации и управления текущим счетом.
 */
function createScore() {
    return {

        // Текусчий счет.
        _value: 0,

        // Флаг отрисовки счета.
        _hidden: false,

        // Сохраненный элемент счета.
        _counterEl: null,

        // ИД блока.
        _id: "stars",

        // ХТМЛ элемент компонента.
        _el: null,

        //  ХТМЛ элемент родительского блока.
        _parentEl: null,

        // Флаг отрисовки.
        _rendered: false,

        /**
         * Инициализация объекта.
         */
        init: function() {
            // Создаем блок компонента.
            this._el = document.createElement("div");
            this._el.id = this._id;

            // Создаем элемент счетчика.
            this._counterEl = document.createElement("span");
            this._counterEl.className = "counter";
            this._el.appendChild(this._counterEl);
        },

        /**
         * Получить текущий счет.
         * @return    Значение текущего счета.
         */
        getValue: function() {
            return this._value;
        },

        /**
         * Установить текущий счет.
         * @param value    Значение счета.
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

            // Отобразить текущий счет.
            this._counterEl.innerText = ("" + this._value);
        }
    };
}