<template>
  <div class="accounts">
    <AccountsList/>
  </div>
</template>

<script>
import AccountsList from '@/components/AccountsList.vue'

export default {
  name: 'Accounts',

  components: {
    AccountsList
  }

}
</script>
