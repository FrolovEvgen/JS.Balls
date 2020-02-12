/**
 * Объект конфигурации и управления стартовым блоком.
 */
function createStartBlock() {
    return {

        // Флаг отрисовки шарика.
        _hidden: false,

        // Сохраненная кнопка.
        _buttonEl: null,

        // ИД блока.
        _id: "start-block",

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
            this._el.id =  this._id;

            // Создаем кнопку
            this._buttonEl = document.createElement("button");
            this._buttonEl.id = "start-game";
            this._buttonEl.innerText = "НАЧАТЬ ИГРУ";

            // Добавляем кнопочку на компонент.
            this._el.appendChild(this._buttonEl);

            // Сохраняем ссылку на себя.
            var self = this;

            // Устанавливаем обработчик для кнопки.
            self._buttonEl.onclick = function(event) {
                self.onStartButtonClick(event);
            }
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
         * Обработчик нажатия кнопки.
         */
        onStartButtonClick: function() {},

        /**
         * Отрисовать объект.
         */
        render: function() {
            // Не даем удалать удаленный компонент и наоборот.
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
        }
    };
}