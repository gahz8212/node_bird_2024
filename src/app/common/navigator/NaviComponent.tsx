import React from 'react';

const NaviComponent = () => {
    return (
        <div className='menu-Wrapper'>
            <ul className="main-menu">
                <li className="item">
                    <div className="item_name">Home</div>
                    <div className="item_contents">
                        <div className="contents_menu">
                            <ul className='inner'>
                                <li>
                                    <h4>History</h4>
                                    <ul>
                                        <li></li>
                                    </ul>
                                </li>
                                <li>
                                    <h4>Contact Us</h4>
                                    <ul>
                                        <li></li>
                                    </ul>
                                </li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li className="item">
                    <div className="item_name">Ex/Import</div>
                    <div className="item_contents">
                        <div className="contents_menu">
                            <ul className="inner">
                                <li>
                                    <h4>Import</h4>
                                    <ul>
                                        <li>수입 실적</li>
                                        <li>수입 실적 확인</li>
                                    </ul>
                                </li>
                                <li>
                                    <h4>Export</h4>
                                    <ul>
                                        <li>수출 실적</li>
                                        <li>수출 실적 확인</li>
                                        <li>오더 관리</li>
                                    </ul>
                                </li>
                                <li>
                                    <h4>Document</h4>
                                    <ul>
                                        <li>Invoice</li>
                                        <li>Purchase</li>
                                        <li>Pallet</li>
                                    </ul>
                                </li>

                            </ul>
                        </div>
                    </div>
                </li>
                <li className="item">
                    <div className="item_name">Craft</div>
                    <div className="item_contents">
                        <div className="contents_menu">

                            <ul className="inner">
                                <li>
                                    <h4>EDT</h4>
                                    <ul>
                                        <li>H2O</li>
                                        <li>IDT</li>
                                        <li>DOG DIRECTOR</li>
                                        <li>SPR</li>
                                        

                                    </ul>
                                </li>
                                <li>
                                    <h4>NOBARK</h4>
                                    <ul>
                                        <li>BARKBOSS</li>
                                        <li>1125 DT</li>
                                        <li>1145 DT</li>
                                        <li>ULTRA</li>

                                    </ul>
                                </li>
                                <li>
                                    <h4>LAUNCHER</h4>
                                    <ul>
                                        <li>BL</li>
                                        <li>DUMMY</li>


                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li className="item">
                    <div className="item_name">Items</div>
                    <div className="item_contents">
                        <div className="contents_menu">
                            <ul className="inner">
                                <li>
                                    <h4>Product</h4>
                                    <ul>
                                        <li>EDT</li>
                                        <li>NOBARK</li>
                                        <li>LAUNCHER</li>
                                    </ul>
                                </li>
                                <li>
                                    <h4>Assemble</h4>
                                    <ul>
                                        <li>회로</li>
                                        <li>전장</li>
                                        <li>기구</li>
                                        <li>포장</li>
                                        <li>기타</li>
                                    </ul>
                                </li>
                                <li>
                                    <h4>Parts</h4>
                                    <ul>
                                        <li>회로물</li>
                                        <li>전장물</li>
                                        <li>기구물</li>
                                        <li>포장물</li>
                                        <li>기타</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li className="item">
                    <div className="item_name">About</div>
                    <div className="item_contents"></div>
                </li>
            </ul>
        </div >
    );
};

export default NaviComponent;