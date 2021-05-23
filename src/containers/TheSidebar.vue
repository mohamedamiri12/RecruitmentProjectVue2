<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 556 134"
      />
      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>

    <CSidebarNav>
      <CSidebarNavItem>
        <CLink
          class="c-sidebar-nav-link"
          to="/dashboard"
          :exact="true"
          activeClassName="c-active"
        >
          <i class="fas fa-tachometer-alt c-sidebar-nav-icon"></i>
          Dashboard
        </CLink>
      </CSidebarNavItem>

      <CSidebarNavItem>
          <CLink
            class="c-sidebar-nav-link"
            to="/dash/users"
            :exact="true"
            activeClassName="c-active"
          >
            <i class="fas fa-users c-sidebar-nav-icon"></i>
            Users
          </CLink>
        </CSidebarNavItem>

        <CSidebarNavItem>
          <CLink
            class="c-sidebar-nav-link"
            to="/dash/clients"
            :exact="true"
            activeClassName="c-active"
          >
            <i class="fas fa-handshake c-sidebar-nav-icon"></i>
            Clients
          </CLink>
        </CSidebarNavItem>

        <CSidebarNavItem>
          <CLink
            class="c-sidebar-nav-link"
            to="/dash/candidates"
            :exact="true"
            activeClassName="c-active"
          >
            <i class="fas fa-users c-sidebar-nav-icon"></i>
            
            Candidates
          </CLink>
        </CSidebarNavItem>

        <CSidebarNavItem>
          <CLink
            class="c-sidebar-nav-link"
            to="/dash/categories"
            :exact="true"
            activeClassName="c-active"
          >
            <i class="fas fa-stream c-sidebar-nav-icon"></i>
            
            Categories
          </CLink>
        </CSidebarNavItem>

        <CSidebarNavItem>
          <CLink
            class="c-sidebar-nav-link"
            to="/dash/skills"
            :exact="true"
            activeClassName="c-active"
          >
            <i class="fas fa-award c-sidebar-nav-icon"></i>
            
            Skills
          </CLink>
        </CSidebarNavItem>

        <CSidebarNavItem>
          <CLink
            class="c-sidebar-nav-link"
            to="/dash/missions"
            :exact="true"
            activeClassName="c-active"
          >
            <i class="fas fa-bullseye c-sidebar-nav-icon"></i>
            
            Missions
          </CLink>
        </CSidebarNavItem>

        <CSidebarNavItem>
          <CLink
            class="c-sidebar-nav-link"
            to="/dash/contracts"
            :exact="true"
            activeClassName="c-active"
          >
            <i class="fas fa-file-contract c-sidebar-nav-icon"></i>
            
            Contracts
          </CLink>
        </CSidebarNavItem>

    </CSidebarNav>

    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from "./_nav";

export default {
  name: "TheSidebar",
  nav,
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
  },
};
</script>

<style scoped>
.c-sidebar .c-sidebar-nav-link, .c-sidebar .c-sidebar-nav-dropdown-toggle{
  color: rgba(255,255,255,.8);
  text-transform: capitalize;
  background: 0 0;
  font-size: .875rem;
  font-weight: 400;

}
.c-sidebar .c-sidebar-nav-link:hover, .c-sidebar .c-sidebar-nav-dropdown-toggle:hover{
  text-decoration: none;
}
</style>
