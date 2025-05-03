import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NotificationPanel from '../components/NotificationPanel';
import { FaBars, FaRegBell } from 'react-icons/fa';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: row;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 260px;
  background: #f8f8f8;
  min-height: 100vh;
  padding: 32px 32px 0 32px;
  transition: margin-left 0.3s;
  width: calc(100vw - 260px);

  @media (max-width: 900px) {
    margin-left: 0;
    padding: 16px 4vw 0 4vw;
    margin-top: 56px;
  }
`;

const TopBarMobile = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 56px;
    background: #3C855B;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 300;
    padding-left: 8px;
    justify-content: space-between;
    padding-right: 16px;
  }
`;

const HamburgerButton = styled.button`
  background: #3C855B;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 1.5rem;
  cursor: pointer;
  @media (min-width: 901px) {
    display: none;
  }
`;

const ResponsiveSidebar = styled.div<{ open: boolean }>`
  display: none;
  @media (max-width: 900px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 260px;
    z-index: 250;
    background: #3C855B;
    margin-top: 54px;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s;
    box-shadow: ${({ open }) => (open ? '2px 0 16px rgba(0,0,0,0.12)' : 'none')};
  }
`;

const Overlay = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.18);
  z-index: 200;
`;

const DesktopSidebar = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  position: relative;
`;

const NotificationDot = styled.span`
  background: red;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: white;
  position: absolute;
  top: 5px;
  right: 5px;
  @media (max-width: 900px) {
    bottom: 18px;
    right: 10px;
    top: 0;
  }
`;

const MobileNotificationPanelWrapper = styled.div`
  position: fixed;
  top: 56px;
  right: 8px;
  z-index: 400;
  width: 400px;
  max-width: 96vw;
`;

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  // TODO: Depois da criação da rota de notificações, substituir por uma requisição ao backend
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Notificação 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac dignissim neque. Duis tincidunt tincidunt odio vel tempus. Morbi egestas tristique metus. Fusce dapibus euismod efficitur. Quisque dignissim neque...', read: false },
    { id: 2, title: 'Notificação 2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac dignissim neque. Duis tincidunt tincidunt odio vel tempus. Morbi egestas tristique metus. Fusce dapibus euismod efficitur. Quisque dignissim neque...', read: false },
    { id: 3, title: 'Notificação 3', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac dignissim neque. Duis tincidunt tincidunt odio vel tempus. Morbi egestas tristique metus. Fusce dapibus euismod efficitur. Quisque dignissim neque...', read: true },
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSidebarClose = () => setSidebarOpen(false);
  const handleSidebarOpen = () => setSidebarOpen(!sidebarOpen);
  const handleBellClick = () => setShowNotifications((prev) => !prev);

  const handleCloseNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  const handleClearAll = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  const handleMarkRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const panelRef = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!showNotifications) return;
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  return (
    <LayoutContainer>
      <TopBarMobile>
        <HamburgerButton onClick={handleSidebarOpen} aria-label="Abrir menu">
          <FaBars />
        </HamburgerButton>
        <IconButton onClick={handleBellClick} aria-label="Notificações">
          <FaRegBell color="#fff" size={22} />
          {unreadCount > 0 && <NotificationDot>{unreadCount}</NotificationDot>}
        </IconButton>
        {showNotifications && (
          <MobileNotificationPanelWrapper ref={panelRef}>
            <NotificationPanel
              notifications={notifications}
              onClose={handleCloseNotification}
              onClearAll={handleClearAll}
              onMarkRead={handleMarkRead}
            />
          </MobileNotificationPanelWrapper>
        )}
      </TopBarMobile>
      <DesktopSidebar>
        <Sidebar />
      </DesktopSidebar>
      <ResponsiveSidebar open={sidebarOpen}>
        <Sidebar />
      </ResponsiveSidebar>
      <Overlay open={sidebarOpen} onClick={handleSidebarClose} />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default MainLayout; 