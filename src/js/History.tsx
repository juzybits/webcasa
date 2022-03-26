export function History() {
    return (
<div id="history_page" className="hidden">

    <div id="list" className="pure-u-1">
        <div className="email-item email-item-selected pure-g">
            <div className="pure-u-3-4">
                <h5 className="email-name">Fri Mar 25 11:49:03</h5>
                <h4 className="email-subject">Memo for third transfer</h4>
                <p className="email-desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                </p>
            </div>
        </div>

        <div className="email-item email-item-unread pure-g">
            <div className="pure-u-3-4">
                <h5 className="email-name">Thu Mar 24 22:20:49</h5>
                <h4 className="email-subject">Memo for second transfer</h4>
                <p className="email-desc">
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa.
                </p>
            </div>
        </div>

        <div className="email-item pure-g">
            <div className="pure-u-3-4">
                <h5 className="email-name">Mon Mar 21 15:23:18</h5>
                <h4 className="email-subject">Memo for first transfer</h4>
                <p className="email-desc">
                    Mauris tempor mi vitae sem aliquet pharetra. Fusce in dui purus, nec malesuada mauris.
                </p>
            </div>
        </div>

    </div>

    <div id="main" className="pure-u-1">
        <div className="email-content">
            <div className="email-content-header pure-g">
                <div className="pure-u-1-2">
                    <h1 className="email-content-title">Memo for third transfer</h1>
                    <p className="email-content-subtitle">
                        From <a>John Doe</a> at <span>Fri Mar 25 11:49:03</span>
                    </p>
                </div>

                <div className="email-content-controls pure-u-1-2">
                    <button className="secondary-button pure-button">Inspect</button>
                    <button className="secondary-button pure-button">Delete</button>
                </div>
            </div>

            <div className="email-content-body">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                    Aliquam ac feugiat dolor. Proin mattis massa sit amet enim iaculis tincidunt. Mauris tempor mi vitae sem aliquet pharetra. Fusce in dui purus, nec malesuada mauris. Curabitur ornare arcu quis mi blandit laoreet. Vivamus imperdiet fermentum mauris, ac posuere urna tempor at. Duis pellentesque justo ac sapien aliquet egestas. Morbi enim mi, porta eget ullamcorper at, pharetra id lorem.
                </p>
                <p>
                    Donec sagittis dolor ut quam pharetra pretium varius in nibh. Suspendisse potenti. Donec imperdiet, velit vel adipiscing bibendum, leo eros tristique augue, eu rutrum lacus sapien vel quam. Nam orci arcu, luctus quis vestibulum ut, ullamcorper ut enim. Morbi semper erat quis orci aliquet condimentum. Nam interdum mauris sed massa dignissim rhoncus.
                </p>
            </div>
        </div>
    </div>

</div>
    );
}
