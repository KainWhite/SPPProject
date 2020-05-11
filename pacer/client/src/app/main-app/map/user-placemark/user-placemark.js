import React from "react";
import $ from 'jquery';
import {Placemark, withYMaps} from "react-yandex-maps";
import {UserPlacemarkBalloon} from './user-placemark-balloon/user-placemark-balloon';

function UserPlacemark(props) {
  const UserPlacemarkCore = React.memo(({ymaps}) => {
    const makeLayout = (layoutFactory) => {
      const Layout = layoutFactory.createClass(
          UserPlacemarkBalloon(props),
          {
            build: function() {
              Layout.superclass.build.call(this);

              this.element = $('.map__placemark-balloon', this.getParentElement());
              this.element
                  .find('#placemark-balloon__profile-btn_user-id_' + props.user.id)
                  .on('click',
                      {user: this.user},
                      (event) => this.profileClick(event.data.user));
              this.element
                  .find('#placemark-balloon__chat-btn_user-id_' + props.user.id)
                  .on('click',
                      {user: this.user},
                      (event) => this.chatClick(event.data.user));
            },

            clear: function() {
              this.element
                  .find('#placemark-balloon__profile-btn_user-id_' + props.user.id)
                  .off('click');
              this.element
                  .find('#placemark-balloon__chat-btn_user-id_' + props.user.id)
                  .off('click');

              Layout.superclass.clear.call(this);
            },

            user: props.user,
            profileClick: props.profileClick,
            chatClick: props.chatClick,
          });
      return Layout;
    };

    return (
        <Placemark
            {...props}
            options={{
              balloonContentLayout: makeLayout(ymaps.templateLayoutFactory),
              balloonPanelMaxMapArea: 0,
              ...props.options,
            }}
        />
    );
  });

  const UserPlacemark = React.useMemo(() => {
    return withYMaps(
        UserPlacemarkCore,
        true,
        ["geoObject.addon.balloon", "templateLayoutFactory"]);
  }, [UserPlacemarkCore]);
  return <UserPlacemark/>;
}

export {UserPlacemark}
